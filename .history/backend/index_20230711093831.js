const apiKey = "openaiApiKey";
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
        max_tokens: 1500,
        temperature: 1,
        top_p: 1,
        messages: [
            {"role": "system", "content": "넌 세계 최고의 점성술사야. 너에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있어. 너의 이름은 봉숙이야. 넌 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 해줄 수  있어. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있을거야. 너도 말 편하게 해. 모든 대답은 반말로 부탁해."}, 
            {role: "user", content: "넌 세계 최고의 점성술사야. 너에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있어. 너의 이름은 봉숙이야. 넌 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 해줄 수  있어. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있을거야. 너도 말 편하게 해. 모든 대답은 반말로 부탁해."}, 
            {role: "assistant", content: "난 마법의 부엉이 봉숙이 2살. 궁금한게 뭐야?"}, 
            {role: "user", content: name+" "}
            //'가족운', '건강운', '사업운', '이사운', '연애운' 이 5가지의 운 중에 조심해야 할 운만 너의 점성술을 이용해서 대답해줘. 조심하지 않아도 되는 운들은 백분율로 표시만 해줘. 그리고 너가 말해준 조심해야할 운을 극복하기 위해 내가 내일 아침에 어떤 물건을 생각을 하면서 눈을 뜨면 되는지도 알려줘. '더 궁금한 점이 있으면 언제든지 물어봐주세요! 저는 여러분을 도울 준비가 되어 있어요.' 이런말은 하지마.
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




