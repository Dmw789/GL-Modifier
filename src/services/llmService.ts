export async function fetchAIResponse(instruction: string, prompt: string, openAIKey: string): Promise<string | null> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openAIKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: instruction,
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.2,
        }),
      });
  
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      console.error('Error:', err);
      return null;
    }
  }
  