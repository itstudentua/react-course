import { useState, useEffect } from "react";

export function useGoogleSheet() {
  const [googleWords, setGoogleWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchWords() {
        try {
          setIsLoading(true);
          setError("");

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
              ? el[0].toString()
              : el[0];
            // true and false are always boolean type at google sheets
          });

          setGoogleWords(() => helpArray.filter((item) => item !== "")); // remove '' item);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      fetchWords();
     
      return function () {
        controller.abort();
      };
    },
    []);

  return { googleWords, isLoading, error };
}