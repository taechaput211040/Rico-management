export async function getPalletePreset({ commit, state, rootState }) {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await this.$axios.get(
        `http://localhost:3000/css/preset/rico`
      );
      commit("setPallete", data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function updatePalette(
  { commit },
  params = {
    web_id: undefined,
    presetId: undefined,
    detail: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.patch(
        `http://localhost:3000/css/preset/rico/${params.web_id}/${params.presetId}`,
        {
          palette: params.detail
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
        `http://localhost:3000/css/organization/rico`,
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
    detail: undefined
  }
) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await this.$axios.post(
        `http://localhost:3000/css/preset/rico/${params.id}`,
        {
          palette: params.detail
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}
