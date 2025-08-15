"use client";

import { Text, InlineCode, CodeBlock, Heading, SmartLink, Media, BlockQuote, Line, LineChart, Feedback } from '@once-ui-system/core';
import React from 'react';

// Define simplified MDX components for client-side rendering
export const mdxComponents = {
  // Chart components
  LineChart: React.memo((props: any) => {
    // Only log in development for debugging
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        console.log('LineChart component mounted with props:', props);
      }, []);
    }
    
    return <LineChart marginY="16" {...props} />;
  }),

  // Text elements
  p: (props: any) => <Text marginY="4" style={{lineHeight: "1.75"}} {...props} />,
  code: (props: any) => <InlineCode {...props} />,

  // Links
  a: (props: any) => {
    // Check if the link is a YouTube URL
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)(?:\S+)?/;
    const match = props.href?.match(youtubeRegex);
    
    if (match) {
      // Ensure the URL starts with https:// for YouTube links
      const fullUrl = props.href.startsWith('http') ? props.href : `https://${props.href}`;
      // It's a YouTube link, use Media component
      return <Media aspectRatio='16 / 9' marginY='16' radius='l' border='neutral-medium' src={fullUrl} />;
    }
    
    // Regular link
    return <SmartLink {...props} />;
  },

  // Images
  img: (props: any) => {
    // Ensure image src is properly formatted
    const src = props.src || '';
    // If it's a relative URL without leading slash, add one
    const formattedSrc = src.startsWith('/') || src.startsWith('http') ? src : `/${src}`;
    return <Media aspectRatio='16 / 9' marginY="16" radius="l" border="neutral-medium" src={formattedSrc} alt={props.alt || ''} />;
  },
  
  // Lines
  hr: (props: any) => <Line marginY="16" {...props} />,

  // Blockquotes
  blockquote: (props: any) => <BlockQuote marginY="16" {...props} />,
  
  // Code blocks
  pre: (props: any) => {
    // Handle code blocks with language specification
    if (props.children?.props?.className) {
      const { className, children } = props.children.props;
      const language = className.replace('language-', '') || 'text';
      return (
        <CodeBlock
          marginTop="16"
          marginBottom="24"
          codes={[{
            code: children,
            language,
            label: language.charAt(0).toUpperCase() + language.slice(1)
          }]}
          copyButton
        />
      );
    }
    
    // Fallback for simple code blocks
    return (
      <CodeBlock
        marginTop="16"
        marginBottom="24"
        codes={[{
          code: typeof props.children === 'string' ? props.children : 'Code',
          language: 'text',
          label: 'Code'
        }]}
        copyButton
      />
    );
  },
  
  // Headings
  h1: (props: any) => <Heading as="h1" marginTop="24" marginBottom="8" {...props} />,
  h2: (props: any) => <Heading as="h2" marginTop="24" marginBottom="8" {...props} />,
  h3: (props: any) => <Heading as="h3" marginTop="24" marginBottom="8" {...props} />,
  h4: (props: any) => <Heading as="h4" marginTop="24" marginBottom="8" {...props} />,
  h5: (props: any) => <Heading as="h5" marginTop="24" marginBottom="8" {...props} />,
  h6: (props: any) => <Heading as="h6" marginTop="24" marginBottom="8" {...props} />,
  
  // Fallback component for any undefined components
  // This prevents errors when MDX tries to render components that don't exist
  fallback: (props: any) => {
    console.warn('Unknown component in MDX:', props);
    return <Feedback>{props.children || 'Error rendering component.'}</Feedback>;
  }
};

// Function to process content for MDX rendering
export const processContentChunk = async (content: string, messageId?: string) => {
  try {
    // Step 1: Process image URLs to proxy external images
    let processedContent = content;
    
    // Handle images with http/https URLs
    processedContent = processedContent.replace(
      /!\[(.*?)\]\((https?:\/\/.*?)\)/g,
      (match, alt, url) => {
        // Proxy the URL through our API
        const proxiedUrl = `/api/og/proxy?url=${encodeURIComponent(url)}`;
        return `![${alt}](${proxiedUrl})`;
      }
    );
    
    // Handle images with relative URLs without leading slash
    processedContent = processedContent.replace(
      /!\[(.*?)\]\((?!https?:\/\/|\/)(.*?)\)/g,
      (match, alt, url) => {
        // Add leading slash to relative URLs
        return `![${alt}](/${url})`;
      }
    );
    
    // Step 1.5: Detect YouTube links in plain text and convert them to markdown links
    const youtubeRegex = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})([^\s]*)/g;
    processedContent = processedContent.replace(youtubeRegex, (match) => {
      // Keep YouTube URLs as is - the Media component will handle them
      return `${match}`;
    });
    
    // Handle frontmatter by converting only the frontmatter section to a code block
    const frontmatterRegex = /^---([\s\S]*?)---\s*/m;
    const frontmatterMatch = processedContent.match(frontmatterRegex);
    
    if (frontmatterMatch) {
      // Extract the frontmatter content
      const frontmatterContent = frontmatterMatch[1].trim();
      
      // Replace only the frontmatter section with a code block
      processedContent = processedContent.replace(
        frontmatterRegex,
        '```yaml\n' + frontmatterContent + '\n```\n\n'
      );
    }
    
    // Step 2: Sanitize custom component tags that aren't defined in our mdxComponents
    // This regex looks for component tags like <CustomComponent> or <CustomComponent prop="value">
    processedContent = processedContent.replace(
      /<([A-Z][a-zA-Z0-9]*)([^>]*)>/g,
      (match, componentName) => {
        // Check if this component is defined in our known components list
        const lowerName = componentName.toLowerCase();
        // Add LineChart to the list of known components
        const knownComponents = [
          'p', 'code', 'a', 'img', 'hr', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'linechart'
        ];
        
        // Special handling for chart components
        if (componentName === 'LineChart') {
          // Preserve LineChart components
          return match;
        }
        
        const isKnownComponent = knownComponents.includes(lowerName);
        
        if (!isKnownComponent) {
          // If not a known component, replace with a paragraph that will be safely rendered
          return `<Text onBackground="danger-medium">Error rendering component.`;
        }
        return match;
      }
    );
    
    // Also replace closing tags
    processedContent = processedContent.replace(
      /<\/([A-Z][a-zA-Z0-9]*)>/g,
      (match, componentName) => {
        // Check if this component is defined in our known components list
        const lowerName = componentName.toLowerCase();
        const knownComponents = [
          'p', 'code', 'a', 'img', 'hr', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'linechart'
        ];
        
        // Special handling for chart components
        if (componentName === 'LineChart') {
          // Preserve LineChart closing tags
          return match;
        }
        
        const isKnownComponent = knownComponents.includes(lowerName);
        
        if (!isKnownComponent) {
          return `</Text>`;
        }
        return match;
      }
    );
    
    // Step 3: Additional safety - replace any remaining custom component syntax
    // But exclude LineChart components
    processedContent = processedContent.replace(/<\/?(?!LineChart\b)([A-Z][a-zA-Z0-9]*)[^>]*>/g, (match, componentName) => {
      // If it's LineChart, preserve it
      if (componentName === 'LineChart') {
        console.log('Preserving LineChart tag:', match);
        return match;
      }
      // Otherwise remove it
      console.log('Removing unknown component tag:', match);
      return '';
    });
    
    return processedContent;
  } catch (error) {
    console.error('Error processing content:', error);
    return content;
  }
};
