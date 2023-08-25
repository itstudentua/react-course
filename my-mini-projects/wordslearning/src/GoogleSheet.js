import { useState, useEffect } from "react";

export function useGoogleSheet() {
  const [googleWords, setGoogleWords] = useState([]);
 

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchWords() {
        try {
         
          const res = await fetch(
            "https://script.google.com/macros/s/AKfycbyEm_5bfp2RipVS6WZV12g4pXosuHOwC_nfOqOWW1q2QnZH5RDdhh8KfqT0gHE6JDsgZA/exec",
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          const helpArray = data.map((el) => {
            return typeof el[0] === "boolean"
            // записываем данные из гуглшит через запятую, [слово, перевод]; потом в таблице будем разделять с помощью split()
              ? el[0].toString() + "," + el[1]
              : el[0] + "," + el[1];
            // true and false are always boolean type at google sheets
          });

          setGoogleWords(() => helpArray.filter((item) => item !== "")); // remove '' item);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
          }
        } 
      }

      fetchWords();
     
      return function () {
        controller.abort();
      };
    },
    []);

  return { googleWords };
}