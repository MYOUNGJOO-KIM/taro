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
            {"role": "system", "content": "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 봉숙이입니다.  당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."}, 
            {role: "user", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 잇습니다. 당신의 이름은 봉숙이입니다.  당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다.특히 연애운을 잘 봐주는 엄청난 점성술사입니다."}, 
            {role: "assistant", content: "전 마법의 부엉이 봉숙이 2살입니다. 무엇이 궁금한가요?"}, 
            {role: "user", content: name+" 상황을 예시로 들어서 무슨일이 있어도 꼭  반말로 대답해줘."}
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




