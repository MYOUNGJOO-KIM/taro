const apiKey = "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";
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
var cors = require('cors')
const app = express()

const configuration = new Configuration({
    apiKey: apiKey//process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// /npm i cors
//CORS 이슈 해결
// let corsOptions = {
//     origin: 'https://www.domain.com',
//     credentials: true
// }

app.use(cors());

//POST 요청 받을 수 있게 만듬
app.use(express.json()) //for parsing application/json
app.use(express.urlencoded({extended: true})) //for parsing application/x-

//POST method route
app.post('/fortuneTell', async function (req, res) {

    const { name } = req.body;

    /* openAI 연동 시작 */
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        max_tokens: 500,
        temperature: 1,
        top_p: 1,
        messages: [
            {"role": "system", "content": "넌 세계 최고의 점성술사야. 너에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있어. 너의 이름은 봉숙이입니다. 우린 세상에서 둘도 없는 친구야. 넌 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 해줄 수  있어. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있을거야. 너도 말  편하게 해. 모든 대답은 반말로 부탁해."}, 
            {role: "user", content: "넌 세계 최고의 점성술사야. 너에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있어. 너의 이름은 봉숙이입니다. 우린 세상에서 둘도 없는 친구야. 넌 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 해줄 수  있어. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있을거야. 너도 말  편하게 해. 모든 대답은 반말로 부탁해."}, 
            {role: "assistant", content: "난 마법의 부엉이 봉숙이 2살. 궁금한게 뭐야?"}, 
            {role: "user", content: name+" 구체적으로 상황을 예시로 들어서 무슨일이 있어도 꼭  반말로 대답해줘."}
            //{role: "user", content: "오늘의 운세는 뭐야?"}
        ],
    });
    let fortune = completion.data.choices[0].message['content'];
    console.log(fortune);
    //res.send(fortune)
    res.json({"assistant" : fortune})
  /* openAI 연동 끝 */

})

app.listen(3000)




