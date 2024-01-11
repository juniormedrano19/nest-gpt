import OpenAI from "openai";

interface Options {
    prompt: string;
  }



  export const prosConsDicusserUseCase = async (openai: OpenAI, { prompt }: Options) => {


    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `
          Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
          la respuesta debe de ser en formato markdown,
          los pros y contras deben de estar en una lista,
            `,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      // model: 'gpt-3.5-turbo',
      model: 'gpt-3.5-turbo',
      
      temperature: 0.8,
      max_tokens: 500,
      //response_format en ciertos modelos es soportados
    //   response_format:{
    //     type:'json_object'
    //   }
    });
//    const jsonResp=JSON.parse(completion.choices[0].message.content)
  
   return response.choices[0].message;



  }