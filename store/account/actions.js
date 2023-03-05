export async function getPalletePreset({ commit, state, rootState }) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `https://static-template-api-ehhif4jpyq-as.a.run.app/css/preset/rico`,
        {
          // headers: {
          //   key: "ramidasky",
          //   origin: "https://member.rafa168.com",
          // },
        }
      );
      console.log(data, "data");
      commit("setPallete", data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
// export async function getFreatureCreditfree({ commit, state, rootState }) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let { data } = await this.$axios.get(
//         `https://static-template-api-ehhif4jpyq-as.a.run.app/css/preset/rico`,
//         {
//           // headers: {
//           //   key: "ramidasky",
//           //   origin: "https://member.rafa168.com",
//           // },
//         }
//       );
//       console.log(data, "data");
//       commit("setPallete", data);
//       resolve(data);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }
export function updatePalette(
  { commit },
  params = {
    web_id: undefined,
    presetId: undefined,
    detail: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `https://static-template-api-ehhif4jpyq-as.a.run.app/css/preset/rico/${params.web_id}/${params.presetId}`,
        {
          palette: params.detail,
        }
      );
      commit("setPallete", response.data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export function CreateOrganizePalette({ commit }, body) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://static-template-api-ehhif4jpyq-as.a.run.app/css/organization/rico`,
        body
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
export function CreatePreset(
  { commit },
  params = {
    id: undefined,
    detail: undefined,
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `https://static-template-api-ehhif4jpyq-as.a.run.app/css/preset/rico/${params.id}`,
        {
          palette: params.detail,
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function getFreatureCreditfree(context) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `${process.env.ALL_CREDITFREE}/Activity/admin/${context.rootState.auth.hash}`
      );

      commit("setCreditFree", data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
