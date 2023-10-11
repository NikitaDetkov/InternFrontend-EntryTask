<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'

  let exchangeRates = {};
  let currencies = {};

  let valueElems = [0, 0];
  let currencieElems = ['USD', 'USD']

  let nigga = 'sdasda';

  async function getExchangeRates() {
    let url = 'https://open.er-api.com/v6/latest/USD';
    let response = await fetch(url);

    exchangeRates = await response.json();
    currencies = exchangeRates.rates;

    console.log(currencies);
  }


  function changeValue(num1: number, num2: number) {
    if (exchangeRates !== null) {
      const cur1 = document.querySelector(`#currencie-${num1 + 1}`)?.value;
      const cur2 = document.querySelector(`#currencie-${num2 + 1}`)?.value;

      const curCoeff1 = currencies[cur1];
      const curCoeff2 = currencies[cur2];
      const coeff = curCoeff2 / curCoeff1;


      valueElems[num1] = Number(document.querySelector(`#value-${num1 + 1}`).value);
      valueElems[num2] = valueElems[num1] * coeff;

  
      console.log(curCoeff1, curCoeff2);
    }
  }

  getExchangeRates();
  
</script>

<main>
  <div>
    <div class="input-wrapper">
      <select name="currencie-1" id="currencie-1" on:change={() => {changeValue(0, 1)}} bind:value={currencieElems[0]}>
        {#each Object.keys(currencies) as currencie, index}
          <option value={currencie}>{currencie}</option>
        {/each}
      </select>
      
      <input id="value-1" type="text" on:input={() => {changeValue(0, 1)}} bind:value={valueElems[0]}>
    </div>


    <div class="input-wrapper">
      <select name="currencie-2" id="currencie-2" on:change={() => {changeValue(1, 0)}} bind:value={currencieElems[1]}>
        {#each Object.keys(currencies) as currencie, index}
          <option value={currencie}>{currencie}</option>
        {/each}
      </select>
      <input id="value-2" type="text" on:input={() => {changeValue(1, 0)}} bind:value={valueElems[1]}>
    </div>

  </div>  
</main>

<style>

</style>
