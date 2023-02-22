<template>
  <div>
    <img
    src="~/assets/image/bank/operator.png"
    v-if="value == 'MANUALBONUS'"
    alt=""
    class="icon-bank img-icon"
  />
    <img
    src="~/assets/image/bank/operator.png"
    v-if="value == 'AUTO'"
    alt=""
    class="icon-bank img-icon"
  />
  <img
  src="~/assets/image/bank/operator.png"
  v-if="value == 'xxxxxx'"
  alt=""
  class="icon-bank img-icon"
/>
    <img
    src="~/assets/image/bank/wheel.png"
    v-if="value == 'WHEEL'"
    alt=""
    class="icon-bank img-icon"
  />
    <img
      src="~/assets/image/bank/BAAC.png"
      v-if="value == 'BAAC'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/BBL.png"
      v-if="value == 'BBL'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/BAY.png"
      v-if="value == 'BAY'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/CIMB.png"
      v-if="value == 'CIMB'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/GHB.png"
      v-if="value == 'GHB'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/GSB.png"
      v-if="value == 'GSB'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/kbank.png"
      v-if="value == 'KBANK'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/KKP.png"
      v-if="value == 'KKP'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/KTB.png"
      v-if="value == 'KTB'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/KTC.png"
      v-if="value == 'KTC'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/LHFG.png"
      v-if="value == 'LHFG'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/SCB.png"
      v-if="value == 'SCB'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/TBANK.png"
      v-if="value == 'TBANK'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/TCD.png"
      v-if="value == 'TCD'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/TISCO.png"
      v-if="value == 'TISCO'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/TMB.png"
      v-if="value == 'TMB'"
      alt=""
      class="icon-bank img-icon"
    />

    <img
    src="https://smart-binary.cloud/storage/pic-380b4e56-7527-4c0f-9ef8-13bcf89802a3-free_PNG90788.png"
    v-if="value == 'CREDITFREE'"
    alt=""
    class="icon-bank img-icon"
  />
  <img
  src="https://smart-binary.cloud/storage/pic-6c29e1b0-b579-414d-9a6c-c1fb6fdac41e-263240.png"
  v-if="value == 'XXXXXX'"
  alt=""
  class="icon-bank img-icon"
/>
  
    
    <img
      src="~/assets/image/bank/TRUEWALLET.png"
      v-if="value == 'TRUEWALLET'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/TTB.png"
      v-if="value == 'TTB'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/UOBT.png"
      v-if="value == 'UOBT'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/WAVEPAY.png"
      v-if="value == 'WAVEPAY'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/RICO.png"
      v-if="value == 'RICO' || value == 'Logo_Ricoautocash-01'"
      alt=""
      class=" img-icon icon-Logo"
    />
    <img
      src="~/assets/image/bank/KBZpay.png"
      v-if="value == 'KBZpay'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/checkin.png"
      v-if="value == 'CHECKIN'"
      alt=""
      class="icon-bank img-icon"
    />
    <img
      src="~/assets/image/bank/cashback.png"
      v-if="value == 'CASHBACK'"
      alt=""
      class="icon-bank img-icon"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: ""
  }
};
</script>

<style></style>
