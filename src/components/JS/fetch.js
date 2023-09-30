import store from '../../storage/index.js'


export async function fetchData(url, method, headers, body, methodFetch) {

  

  try {
    let respone;
    store.commit('util/loadingSpinner', true)
    if (methodFetch === 'body') {
      respone = await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      });
    } else if (methodFetch === "formData") {
      respone = await fetch(url, {
        method: method,
        headers: headers,
        body: body,
      });
    } else {
      respone = await fetch(url, {
        method: method,
        headers: headers,
      });
    }
    store.commit('util/loadingSpinner', false)
    const responseData = await respone.json();

    if (respone.status === 422) {
      return {
        error:
          "Błąd w składni body, url lub inny błąd!",
      };
    }

    if (!respone.ok) {
      return responseData;
    }

    return responseData;
  } catch (error) {
    return {
      error:
        "Błąd z strony serwera. Prawdopodobnie serwer przestał działać, a to powoduje, że strony nie zostaną załadowanę poprawnie. Każda próba będzie przekierowywała na stronę 404",
    };
  }
}
