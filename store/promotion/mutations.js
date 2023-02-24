export function set_promotion(state, payload) {
  state.itempromotion = payload;
  // console.log(state.promotion_object,'asdasd')
}
export function set_bonuslist(state, payload) {
  state.bonus_list = payload;
  // console.log(state.promotion_object,'asdasd')
}

export  function updatePromotionAfterDelete(state, payload) {
  // console.log(state.itempromotion)
 
  state.itempromotion = payload
  // console.log('after',state.itempromotion)
}
