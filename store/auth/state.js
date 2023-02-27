
export default function() {
  return {
    verify: false,
    tfa_credential: null,
    tfa_data: null,
    key: localStorage.getItem("key") || null, //token
    user: localStorage.getItem("username") || null,
    ip:null,
    menu: localStorage.getItem("menu") || null, // ||
    hash: localStorage.getItem("hash") || null, //token
    agent: localStorage.getItem("agent") || null,
    company: localStorage.getItem("company") || null,
    name: localStorage.getItem("name") || null,
    isAdmin: localStorage.getItem("isAdmin") || null,
    tokenMember: localStorage.getItem("tokenMember") || null,



    componentKey:true,

    datarander : {
      data:false,
      depositbalance: 0,
      withdrawbalance: 0,
      profitlossDate:
        0,
      profitlossmounth: 0
    },
    dpbank : [],
    wdbank : [],
    dplist : [],
    wdlist : [],
    incomingSMS :[],
    actionBankState: 
      {
        kbank:"start",
        scb: "start",
        true: "start"
      },
    
    
    gameType: {
      SL: "SLOT",
      LC: "LIVE-CASINO",
      SB: "SPORTBOOK",
      OT: "OTHERS",
      ES: "ESPORT",
      LT: "LOTTO",
      PK: "POKER",
      FH: "FISHING",
      CB: "CARD & BOARD",
      MG: "MINI GAME"
  },
  provider: {
      PGL: "PG Soft(l)",
      SML: "Smart Lotto",
      S2S: "Sexy Baccarat",
      EVP: "EVOPLAY",
      JKR: "Joker",
      RRG: "Red Rake Gaming SLOT",
      RTG: "Red Tiger",
      HBO: "HABANERO",
      BGO: "Booongo",
      AVX: "AvatarUX",
      GNJ: "Green Jade",
      GMX: "Gamzix",
      GHO: "Golden Hero",
      CLT: "Caleta Gaming",
      YLT: "Yolted",
      KLB: "Kalamba Games",
      MST: "MrSlotty",
      SBE: "Spribe",
      TBG: "Turbogames",
      TMH: "Tom Horn",
      TGE: "Tangente",
      WZN: "Wazdan",
      RVG: "Revolver Gaming",
      PSN: "Playson",
      MNC: "Mancala Gaming",
      MGE: "Red Rake Gaming",
      HSG: "Hacksaw Gaming",
      SPG: "SPADE GAMING",
      NTN: "NetEnt",
      PNG: "Play'n Go",
      ONT: "OneTouch",
      BST: "BETSOFT",
      YGG: "Yggdrasil",
      BPT: "Blueprint Gaming",
      NLC: "Nolimit City",
      PGP: "PRAGMATIC PLAY",
      PGS: "PGSOFT",
      PPL: "Pragmatic Play Live",
      EZG: "Ezugi",
      BGT: "BetGames.TV",
      EBT: "eBET",
      OTL: "Onetouch Live",
      EVO: "EVOLUTION",
      ASG: "ASIAGAMING",
      SSC: "Super Spade Games",
      CQ9: "CQ9",
      AMX: "AMEBA",
      PGA: "PG Soft",
      GMT: "Gamatron",
      JLS: "JILI",
      JKR: "Joker",
      DGS: "Dream Gamings",

      AB: "Allbet",
      AG: "ASIA GAMING",
      CQ: "CQ9",

      AV: "AVIA Gaming",
      CB: "CitiBet",
      DG: "Dream Gaming",
      FG: "Fun Gaming",
      FI: "Maverick",
      F5: "Maverick",
      GE: "Evolution Gaming",
      GM: "Gamatron",
      GT: "BTI",
      L4: "LIVE22",
      PG: "PG Soft",
      PR: "Pragmatic Play",
      PX: "Playtech",
      S2: "Sexy Baccarat",
      SG: "Spade Gaming",
      SO: "SBO",
      SY: "Simple Play",
      VV: "Vivo Gaming",
      WB: "Wbet",

      AM: "Ameba",
      CQ: "CQ9",
      EP: "Evoplay",
      JK: "Joker",
      SA: "SA Gaming",
      RE: "Red Tiger",

      JL: "JiLi",
      DS: "Dragoon Soft",
      AP: "AMB Poker",
      UF: "UFA Sportbook",
      XP: "BetSoft",
      WC: "WM Casino",

      GN: "Genesis"
  },

  memberOnline:{count:0,data:[]}
  };
  
}
