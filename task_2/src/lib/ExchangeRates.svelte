
<script lang="ts">
      type ExchangeRates = {
    rates?: Currencies
  };

  type Currencies = {
    [key: string]: number
  }

  let exchangeRates: ExchangeRates = {};
  let currencies: Currencies = {};

  let valueElems = [0, 0];
  let currencieElems = ['USD', 'USD'];

  const urlRates = 'https://open.er-api.com/v6/latest/USD';

  /**
   * Функция для получения данных с сервера
  */
  async function getExchangeRates() {
    try {
      const response = await fetch(urlRates);

      exchangeRates = await response.json();

      if (exchangeRates.rates) {
        currencies = exchangeRates.rates;
      }
    } catch(err) {
      console.log(err);
    }
  }

  /**
   * Функция для изменения значений котировок
   * @param num1
   * @param num2
   */
  function changeValue(num1: number, num2: number) {
    if (exchangeRates) {
      const cur1 = currencieElems[num1];
      const cur2 = currencieElems[num2];

      const curCoeff1: number = currencies[cur1];
      const curCoeff2: number = currencies[cur2];
      const coeff: number = curCoeff2 / curCoeff1;

      valueElems[num1] = +valueElems[num1];
      valueElems[num2] = valueElems[num1] * coeff;
    }
  }

  getExchangeRates();
</script>

<div>
    <div class="input-wrapper">
      <select name="currencie-1" id="currencie-1" bind:value={currencieElems[0]} on:change={() => {changeValue(0, 1)}}>
        {#each Object.keys(currencies) as currencie, index}
          <option value={currencie}>{currencie}</option>
        {/each}
      </select>
      
      <input id="value-1" type="text" bind:value={valueElems[0]} on:input={() => {changeValue(0, 1)}}>
    </div>


    <div class="input-wrapper">
      <select name="currencie-2" id="currencie-2" bind:value={currencieElems[1]} on:change={() => {changeValue(1, 0)}}>
        {#each Object.keys(currencies) as currencie, index}
          <option value={currencie}>{currencie}</option>
        {/each}
      </select>
      <input id="value-2" type="text" bind:value={valueElems[1]} on:input={() => {changeValue(1, 0)}}>
    </div>

  </div>  