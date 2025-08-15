"use client";

import { useChat } from '@ai-sdk/react';
import { Column, Row, Text, Textarea, IconButton, Skeleton, Heading, Button, CodeBlock, useToast } from '@once-ui-system/core';
import { prompts } from '@/content/misc/prompts';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { mdxComponents, processContentChunk } from './Format';

export default function ChatClient(): React.ReactNode {
  const { addToast } = useToast();
  // References for the messages container and chat container to enable auto-scrolling
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  // Use the AI SDK's useChat hook with proper configuration
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat(
		{
			initialMessages: prompts.system.map((prompt, index) => ({
				role: "system",
				id: `system-${index}`,
				content: prompt,
			}))
		}
	);
  
  // State to store processed MDX content
  const [mdxContents, setMdxContents] = useState<{[key: string]: any}>({});
  // State to track which messages are showing code view
  const [codeViewMessages, setCodeViewMessages] = useState<{[key: string]: boolean}>({});
  // Track which message is currently streaming
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  // Track when we're waiting for the initial response (not streaming yet)
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  // Use refs for tracking processing state to avoid triggering effect reruns
  const lastProcessTimeRef = useRef(0);
  const lastProcessedContentRef = useRef<{[key: string]: string}>({});
  const processingRef = useRef<{[key: string]: boolean}>({});
  
  // Wrapper for the imported processContentChunk function
  // Memoize the function to prevent it from being recreated on each render
  const processMessageContent = useCallback(async (content: string, messageId: string) => {
    // Skip if we're already processing this content or if it hasn't changed
    if (processingRef.current[messageId]) return;
    if (lastProcessedContentRef.current[messageId] === content) return;
    
    // Mark as processing to prevent duplicate processing
    processingRef.current[messageId] = true;
    
    try {
      // Process the content using the imported function
      const processedContent = await processContentChunk(content);
      
      // Step 4: Serialize the processed content
      const mdxSource = await serialize(processedContent);
      
      // Update the processed content in our state
      setMdxContents(prevState => ({
        ...prevState,
        [messageId]: mdxSource
      }));
      
      // Record that we've processed this content
      lastProcessedContentRef.current[messageId] = content;
    } catch (error) {
      console.error('Error processing content:', error);
    } finally {
      // Mark as no longer processing
      processingRef.current[messageId] = false;
    }
  }, []);

  // Track streaming state changes based on isLoading changes only
  useEffect(() => {
    // Only run this effect when isLoading changes to avoid loops
    if (isLoading) {
      // First, check if there's an assistant message in the messages array
      const lastAssistantMessage = [...messages].reverse()
        .find(msg => msg.role === 'assistant');
      
      if (lastAssistantMessage) {
        // We have an assistant message, so we're streaming content
        setStreamingMessageId(lastAssistantMessage.id);
        setIsWaitingForResponse(false); // No longer waiting, now streaming
      } else {
        // No assistant message yet, so we're waiting for the initial response
        setIsWaitingForResponse(true);
        setStreamingMessageId(null);
      }
    } else {
      // Loading has ended
      setIsWaitingForResponse(false);
      
      // Process final message content when streaming ends
      if (streamingMessageId) {
        const messageToProcess = messages.find(msg => msg.id === streamingMessageId);
        if (messageToProcess && messageToProcess.role === 'assistant') {
          // Use a timeout to ensure this happens after state updates
          setTimeout(() => {
            processMessageContent(messageToProcess.content as string, messageToProcess.id);
          }, 0);
        }
        
        // Reset streaming message ID
        setStreamingMessageId(null);
      }
    }
    // Only depend on isLoading and messages to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, messages]);

  // Process streaming content incrementally with throttling and content diffing
  useEffect(() => {
    // Only run this effect when messages change and we have a streaming message
    if (!streamingMessageId || !isLoading) return;
    
    // Find the streaming message
    const streamingMessage = messages.find(msg => msg.id === streamingMessageId);
    if (!streamingMessage || streamingMessage.role !== 'assistant') return;
    
    // Get the current content
    const currentContent = streamingMessage.content as string;
    if (!currentContent) return;
    
    // Use a ref to track the timeout ID so we can clean it up
    const timeoutRef = { current: null as NodeJS.Timeout | null };
    
    // Set up a single timeout to process content with throttling
    timeoutRef.current = setTimeout(() => {
      const now = Date.now();
      // Only process if enough time has passed since last processing
      if (now - lastProcessTimeRef.current > 2000) {
        processMessageContent(currentContent, streamingMessageId);
        lastProcessTimeRef.current = now;
      }
    }, 100); // Small delay to batch rapid message updates
    
    // Clean up timeout on unmount or when dependencies change
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  // Explicitly list dependencies to avoid including unnecessary ones
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, streamingMessageId, isLoading]);

  // Function to handle stopping message generation
  const handleStop = () => {
    if (isLoading && streamingMessageId) {
      // Call the stop function from useChat
      stop();
      // Reset streaming state
      setIsWaitingForResponse(false);
      // Process the current content as final
      const messageToProcess = messages.find(msg => msg.id === streamingMessageId);
      if (messageToProcess && messageToProcess.role === 'assistant') {
        processMessageContent(messageToProcess.content as string, messageToProcess.id);
      }
    }
  };

  // Function to scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current && messagesEndRef.current) {
      // Use a small timeout to ensure DOM has updated
      setTimeout(() => {
        // Get the chat container's scroll height and set it to scroll to bottom
        const chatContainer = chatContainerRef.current;
        // Add null check to satisfy TypeScript
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }
  };

  // Auto-scroll when messages change or when streaming
  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessageId]);

  return (
		<>
      <Column fill center>
        {messages.filter(msg => msg.role !== 'system').length > 0 ? (
          <Column
            ref={chatContainerRef}
            fill
            paddingX="l"
            paddingY="24"
            overflowY="auto"
            horizontal="center"
            id="chat-messages-container">
            <Column fillWidth fitHeight maxWidth="s" gap="24">
              {messages.map(message => (
                <Column key={message.id} paddingTop="2" fillWidth>
                  {/* For user messages, render as plain text or code block */}
                  {message.role === 'user' && typeof message.content === 'string' && (
                    <Row fillWidth horizontal="end" gap="8">
                      <Row
                        data-border="rounded"
                        style={{maxWidth: "24rem", wordBreak: "break-word"}}
                        fitWidth
                        paddingX="20"
                        paddingY="12"
                        radius="l"
                        background="neutral-alpha-weak">
                        <Text align="right">
                          {message.content}
                        </Text>
                      </Row>
                    </Row>
                  )}
                  {/* For AI messages, render as MDX if available or code block if toggled */}
                  {message.role === 'assistant' && (
                    <Column fillWidth gap="8">
                      <Column fillWidth>
                        {codeViewMessages[message.id] ? (
                          <CodeBlock
                            codes={[{
                              code: typeof message.content === 'string' ? message.content : 
                                Array.isArray(message.content) ? 
                                  (message.content as any[]).map(part => 
                                    typeof part === 'string' ? part : part.text || '').join('') : 
                                  'Content unavailable',
                              language: 'markdown',
                              label: 'Message Source'
                            }]}
                            copyButton
                          />
                        ) : (
                          // If MDX is available for this message, render as MDX regardless of streaming state
                          mdxContents[message.id] ? (
                            <MDXRemote 
                              {...mdxContents[message.id]} 
                              components={mdxComponents}
                              // Add options to handle undefined components
                              options={{
                                mdxOptions: {
                                  development: false, // Disable development warnings
                                  providerImportSource: "@mdx-js/react" // Use standard provider
                                }
                              }}
                            />
                          ) : (
                            // If message is streaming or MDX isn't processed yet, render as plain text
                            <Text>{typeof message.content === 'string' ? message.content : 
                              Array.isArray(message.content) ? 
                                (message.content as any[]).map(part => 
                                  typeof part === 'string' ? part : part.text || '').join('') : 
                                'Content unavailable'}
                            </Text>
                          )
                        )}
                      </Column>
                      {/* Only show action buttons when the message is not currently streaming */}
                      {message.id !== streamingMessageId && (
                        <Row gap="8">
                          <IconButton 
                            icon="copy"
                            variant="ghost" 
                            size="s"
                            tooltip="Copy"
                            onClick={() => {
                              navigator.clipboard.writeText(typeof message.content === 'string' ? message.content : 
                                Array.isArray(message.content) ? 
                                  (message.content as any[]).map(part => 
                                    typeof part === 'string' ? part : part.text || '').join('') : 
                                  'Content unavailable');
                              addToast({
                                message: 'Message copied to clipboard',
                                variant: 'success',
                              });
                            }}
                          />
                          <IconButton 
                            icon="code" 
                            variant="tertiary" 
                            size="s"
                            tooltip="Code"
                            onClick={() => {
                              setCodeViewMessages(prev => ({
                                ...prev,
                                [message.id]: !prev[message.id]
                              }));
                            }}
                          />
                        </Row>
                      )}
                    </Column>
                  )}
                </Column>
              ))}
              {/* Only show loading skeleton when waiting for initial response, not when streaming */}
              {isWaitingForResponse && (
                <Row gap="8">
                  <Skeleton shape="circle" width="xs" height="xs"/>
                  <Skeleton shape="circle" width="xs" height="xs" delay="1"/>
                  <Skeleton shape="circle" width="xs" height="xs" delay="2"/>
                </Row>
              )}
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} style={{ height: "1px", opacity: 0 }}></div>
            </Column>
          </Column>
        ) : (
          <Heading variant="display-default-xs" align="center" marginBottom="48">
            What are we working on?
          </Heading>
        )}
        <form style={{width: "100%"}} onSubmit={handleSubmit}>
          <Row fillWidth horizontal="center" paddingX="l">
            <Column maxWidth="s" paddingBottom="16" data-border="rounded">
              <Textarea
                style={{maxHeight: "10rem"}}
                id="chat-input"
                lines="auto"
                value={input}
                placeholder={isLoading ? "Generating..." : "Ask anything"}
                onChange={handleInputChange}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault(); // Prevent default behavior (new line)
                    handleSubmit(e as any);
                  }
                }}
              >
							<Row fillWidth paddingX="12" paddingBottom="12" horizontal="between">
								<Row marginLeft="2">
									{/* <IconButton variant="secondary" icon="attach"/> */}
								</Row>
								<Row>
									<IconButton icon={isLoading ? "stop" : "send"} disabled={input.length === 0} onClick={isLoading ? handleStop : handleSubmit}/>
								</Row>
							</Row>
						</Textarea>
					</Column>
				</Row>
			</form>
			{/* Only show questions when there are no non-system messages */}
			{messages.filter(message => message.role !== 'system').length === 0 && (
				<Row data-border="rounded" fillWidth horizontal="center" paddingX="l" gap="8" wrap>
					{prompts.preview.map((prompt, index) => (
						<Button 
							key={index} 
							weight="default" 
							variant="secondary"
							onClick={() => {
								// Create a function to submit the question
								const submitQuestion = async () => {
									// First set the input value
									handleInputChange({ target: { value: prompt }} as any);
									// Wait a moment for the state to update
									await new Promise(resolve => setTimeout(resolve, 50));
									// Then submit the form with an empty event
									handleSubmit(new Event('submit') as any);
								};
								// Execute the submission function
								submitQuestion();
							}}
						>
							{prompt}
						</Button>
					))}
				</Row>
			)}
			</Column>
		</>
  );
}