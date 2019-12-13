const league = require('../../../src/apis/lol/summoner');
const token = require("../../../assets/token.json");

describe("Testing Fetching Capabilities", () => {
    test("Test FetchSummoner(SummonerName", ()=>{
        return league.fetchSummoner("steeelo").then((r)=>{
        });
    });
    test("Test FetchSummoner(SummonerName) not exists", ()=>{
        return league.fetchSummoner("").then((r)=>{
        });
    });
});

describe("testing Query workflow", ()=>{
     test("FetchSum-Rank", (done)=>{
        return league.fetchSummoner("steeelo").then(r=>{
             league.fetchSummonerRank(r.data.id).then(r2=>{
                console.log(r2.data);
                done();
            });  
        })
    })
})