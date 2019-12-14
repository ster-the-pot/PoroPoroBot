const fs = require("fs");
const token = require("../../../assets/token.json")
const axios = require("axios")

async function fetchSummoner(sum){
        try {
            let response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sum}`, {
                params: {
                    api_key: token.lToken
                }
            });
            return response;
        } catch (err) {
            //failed test
            return err;
        }
}

async function fetchSummonerRank(sumId){
    try {
        let response = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}`, {
            params: {
                api_key: token.lToken
            }
        })
        return response;
    } catch (err) {
        return err;
    }
}

async function fetchMatchHistory(encryptedAccountID){
    try{
        let response = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccountID}`, {
            params: {
                api_key: token.lToken
            }
        })
        
        return response;
    }catch(err){
        return err;
    }
}
// get individual match information (players, items, dmg, etc)
async function fetchMatchInfo(matchID){
    try{
        let response = await axios.get(`https://na1.api.riotgames.com/lol/match/v4/matches/{matchID}`, {
            params: {
                api_key: token.lToken
            }
        })
        
        return response;
    }catch(err){
        return err;
    }
}

module.exports = {
    fetchSummonerRank,fetchSummoner, fetchMatchHistory
}