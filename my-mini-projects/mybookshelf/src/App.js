import { useState, useEffect } from 'react';

function App() {

    const [randomBooks, setRandomBooks] = useState([]);
  const numberOfBooks = 3;

  useEffect(() => {
    const getRandomBooks = async () => {
      try {
        // Генерируем случайные индексы для получения случайных книг
        const randomIndexes = [];
        while (randomIndexes.length < numberOfBooks) {
          const randomIndex = Math.floor(Math.random() * 1000000); // Максимальный индекс в Open Library
          if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
          }
        }

        // Получаем информацию о случайных книгах
        const bookRequests = randomIndexes.map(async index => {
          try {
            const response = await fetch(`https://openlibrary.org/works/OL${index}.json`);
            const data = await response.json();

            if (data) {
              return {
                title: data.title,
                author: data.authors ? data.authors[0].name : 'Автор неизвестен',
                genre: data.subjects ? data.subjects[0] : 'Жанр неизвестен',
                year: data.publish_date,
                cover: data.covers ? `http://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg` : null,
              };
            }
          } catch (error) {
            console.error(error);
          }
          return null;
        });

        // Фильтруем книги без данных и сохраняем результаты
        const books = await Promise.all(bookRequests);
        setRandomBooks(books.filter(book => book !== null));
      } catch (error) {
        console.error(error);
      }
    };

    getRandomBooks();
  }, []);

  console.log(randomBooks)

  return (
    <>
      <header>
        <div className="header__container">
          <p className="header__logo__button">My <span>book</span> <br /><span>Shelf</span></p>
          <button className="header__menu__mobile__button">Menu</button>
          <nav>
            <ul className="header__nav__list">
              <li className="activ__list">
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.6868 2.63688C11.136 2.18777 11.8641 2.18777 12.3132 2.63688L20.3632 10.6869C20.6921 11.0158 20.7905 11.5104 20.6125 11.9401C20.4345 12.3699 20.0152 12.65 19.55 12.65H18.4V19.55C18.4 20.1852 17.8851 20.7 17.25 20.7H14.95C14.3149 20.7 13.8 20.1852 13.8 19.55V16.1C13.8 15.4649 13.2851 14.95 12.65 14.95H10.35C9.71489 14.95 9.20002 15.4649 9.20002 16.1V19.55C9.20002 20.1852 8.68515 20.7 8.05002 20.7H5.75002C5.11489 20.7 4.60002 20.1852 4.60002 19.55V12.65H3.45002C2.98489 12.65 2.56556 12.3699 2.38756 11.9401C2.20956 11.5104 2.30795 11.0158 2.63685 10.6869L10.6868 2.63688Z" fill="#4D4D4D" />
                </svg>
                <span>Home</span>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
                  <g clipPath="url(#clip0_63_59)">
                    <path d="M20 16.3333C20 16.1041 19.8125 15.9166 19.5833 15.9166H0.416667C0.1875 15.9166 0 16.1041 0 16.3333V18C0 18.2291 0.1875 18.4166 0.416667 18.4166H1.99167C1.79167 18.6375 1.66667 18.9291 1.66667 19.25C1.66667 19.6166 1.82917 19.95 2.08333 20.1791C2.30417 20.3791 2.6 20.5 2.91667 20.5C3.60417 20.5 4.16667 19.9375 4.16667 19.25C4.16667 18.9291 4.04167 18.6375 3.84167 18.4166H16.1583C15.9583 18.6375 15.8333 18.9291 15.8333 19.25C15.8333 19.9375 16.3958 20.5 17.0833 20.5C17.4 20.5 17.6958 20.3791 17.9167 20.1791C18.1708 19.95 18.3333 19.6166 18.3333 19.25C18.3333 18.9291 18.2083 18.6375 18.0083 18.4166H19.5833C19.8125 18.4166 20 18.2291 20 18V16.3333ZM4.16667 12.1666H2.08333V15.0833H5.41667V7.16663H2.08333V9.24996H4.16667C4.39583 9.24996 4.58333 9.43746 4.58333 9.66663C4.58333 9.89579 4.39583 10.0833 4.16667 10.0833H2.08333V11.3333H4.16667C4.39583 11.3333 4.58333 11.5208 4.58333 11.75C4.58333 11.9791 4.39583 12.1666 4.16667 12.1666Z" fill="#8A8A8A" />
                    <path d="M9.58333 1.75H6.25V4.25H9.58333V1.75Z" fill="#8A8A8A" />
                    <path d="M9.58333 5.08337H6.25V5.91671H9.58333V5.08337Z" fill="#8A8A8A" />
                    <path d="M13.75 17.1666H10.4167V18H13.75V17.1666Z" fill="#8A8A8A" />
                    <path d="M13.75 15.0833V5.91667H10.4167V15.0833H13.75ZM11.7875 6.87083C11.9417 6.71667 12.225 6.71667 12.3792 6.87083C12.4542 6.95 12.5 7.05833 12.5 7.16667C12.5 7.275 12.4542 7.38333 12.3792 7.4625C12.3 7.5375 12.1958 7.58333 12.0833 7.58333C11.975 7.58333 11.8667 7.5375 11.7875 7.4625C11.7125 7.38333 11.6667 7.275 11.6667 7.16667C11.6667 7.05417 11.7125 6.95 11.7875 6.87083ZM11.7875 8.5375C11.9417 8.38333 12.225 8.38333 12.3792 8.5375C12.4542 8.61667 12.5 8.725 12.5 8.83333C12.5 8.94167 12.4542 9.05 12.3792 9.12917C12.3583 9.14583 12.3375 9.1625 12.3167 9.17917C12.2917 9.19583 12.2667 9.20833 12.2417 9.21667C12.2167 9.22917 12.1917 9.2375 12.1667 9.24167C12.1375 9.24583 12.1125 9.25 12.0833 9.25C11.975 9.25 11.8667 9.20417 11.7875 9.12917C11.7125 9.05 11.6667 8.94583 11.6667 8.83333C11.6667 8.725 11.7125 8.61667 11.7875 8.5375ZM11.7875 10.2042C11.8875 10.1083 12.0292 10.0667 12.1667 10.0917C12.1917 10.0958 12.2167 10.1042 12.2417 10.1167C12.2667 10.125 12.2917 10.1375 12.3167 10.1542C12.3375 10.1667 12.3583 10.1875 12.3792 10.2042C12.4542 10.2833 12.5 10.3917 12.5 10.5C12.5 10.6083 12.4542 10.7167 12.3792 10.7958C12.3 10.8708 12.1958 10.9167 12.0833 10.9167C11.975 10.9167 11.8667 10.8708 11.7875 10.7958C11.75 10.7542 11.7208 10.7125 11.7 10.6583C11.6792 10.6083 11.6667 10.5542 11.6667 10.5C11.6667 10.3917 11.7125 10.2833 11.7875 10.2042ZM17.9167 18.4167V20.1792C17.6958 20.3792 17.4 20.5 17.0833 20.5C16.3958 20.5 15.8333 19.9375 15.8333 19.25C15.8333 18.9292 15.9583 18.6375 16.1583 18.4167H17.9167ZM17.9167 15.0833V14.25V5.5H15.8333C15.6042 5.5 15.4167 5.3125 15.4167 5.08333C15.4167 4.85417 15.6042 4.66667 15.8333 4.66667H17.9167V3.41667H15.8333C15.6042 3.41667 15.4167 3.22917 15.4167 3C15.4167 2.77083 15.6042 2.58333 15.8333 2.58333H17.9167V0.5H14.5833V15.0833H17.9167ZM6.25 6.75V15.0833H7.08333H7.5H8.33333H8.75H9.58333V6.75H6.25ZM7.53333 13.2583C7.55417 13.2042 7.58333 13.1625 7.62083 13.1208C7.6625 13.0833 7.70417 13.0542 7.75833 13.0333C7.83333 13 7.91667 12.9917 7.99583 13.0083C8.025 13.0125 8.05 13.0208 8.075 13.0333C8.1 13.0417 8.125 13.0542 8.14583 13.0708C8.17083 13.0833 8.19167 13.1042 8.2125 13.1208C8.2875 13.2 8.33333 13.3083 8.33333 13.4167C8.33333 13.4417 8.32917 13.4708 8.325 13.5C8.32083 13.525 8.3125 13.55 8.3 13.575C8.29167 13.6 8.27917 13.625 8.2625 13.65C8.24583 13.6708 8.22917 13.6917 8.2125 13.7125C8.19167 13.7292 8.17083 13.7458 8.14583 13.7625C8.125 13.7792 8.1 13.7917 8.075 13.8C8.05 13.8125 8.025 13.8208 7.99583 13.825C7.97083 13.8292 7.94167 13.8333 7.91667 13.8333C7.80833 13.8333 7.7 13.7875 7.62083 13.7125C7.54583 13.6333 7.5 13.5292 7.5 13.4167C7.5 13.3625 7.5125 13.3083 7.53333 13.2583Z" fill="#8A8A8A" />
                  </g>
                  <defs>
                    <clipPath id="clip0_63_59">
                      <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                <span>My Shelf</span>
              </li>

              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                  <g clipPath="url(#clip0_75_2858)">
                    <path d="M3.86656 12.1898H0.637812C0.565625 12.1898 0.5 12.2489 0.5 12.3276V18.8311C0.5 18.9065 0.565625 18.9689 0.637812 18.9689H3.86328C3.94203 18.9689 4.00109 18.9033 4.00109 18.8311V12.3276C4.00191 12.3096 3.99901 12.2916 3.99258 12.2747C3.98615 12.2579 3.97632 12.2425 3.96371 12.2296C3.9511 12.2166 3.93597 12.2065 3.91926 12.1996C3.90255 12.1928 3.88461 12.1895 3.86656 12.1898ZM2.61641 18.3586C2.30469 18.3586 2.04875 18.1026 2.04875 17.7909C2.04875 17.4759 2.30469 17.22 2.61641 17.22C2.93141 17.22 3.18734 17.4759 3.18734 17.7909C3.18734 18.1026 2.93141 18.3586 2.61641 18.3586ZM20.6305 14.8444L15.4625 16.5473C15.2623 16.7311 14.9998 16.8361 14.7308 16.8361H9.34953C9.30471 16.8361 9.26173 16.8183 9.23004 16.7866C9.19835 16.7549 9.18055 16.7119 9.18055 16.6671C9.18055 16.6223 9.19835 16.5793 9.23004 16.5476C9.26173 16.5159 9.30471 16.4981 9.34953 16.4981H14.7308C14.9178 16.4981 15.0983 16.4259 15.2361 16.3012C15.2459 16.2881 15.2591 16.2783 15.2722 16.2651C15.4002 16.1306 15.4723 15.9469 15.4723 15.7533C15.4723 15.3431 15.1409 15.0084 14.7308 15.0084H11.0164C10.918 15.0084 10.8327 14.9723 10.7638 14.8969C9.1625 13.079 6.22906 12.8034 4.62125 12.8034C4.52281 12.8034 4.42766 12.8067 4.33906 12.8067V18.1026L9.27734 19.7859C10.4455 20.183 11.6956 20.288 12.9261 20.0681C13.7088 19.9317 14.4644 19.6703 15.1639 19.2937L21.1555 16.0387C21.3687 15.9239 21.4967 15.704 21.4967 15.4645C21.4967 15.3661 21.477 15.2742 21.4311 15.1856C21.3636 15.0397 21.2444 14.9239 21.0965 14.8609C20.9485 14.7979 20.7825 14.792 20.6305 14.8444ZM9.22484 3.69139L9.20187 5.28936C9.20187 5.30577 9.21172 5.31561 9.22484 5.31561H21.4803C21.4902 5.31561 21.5 5.30577 21.5 5.28936V3.71108L9.22484 3.69139ZM14.4388 12.9084V5.64702H9.80562V12.7378C9.80562 12.833 9.88109 12.9117 9.97625 12.9117H14.4388V12.9084ZM20.8995 12.7378V5.64702H16.2631V12.9084H20.7289C20.8208 12.9084 20.8995 12.8297 20.8995 12.7378ZM14.7734 5.64702H15.9317V12.9084H14.7734V5.64702ZM13.4511 3.30092L14.2222 3.55686H16.3452L17.1195 3.30092C17.326 3.23333 17.5116 3.11353 17.6582 2.95313C17.8048 2.79274 17.9075 2.5972 17.9563 2.38545C18.0613 1.95561 17.9333 1.50936 17.6183 1.19108C17.3787 0.948267 17.0605 0.817017 16.7225 0.817017C16.6208 0.817017 16.5223 0.830142 16.4239 0.85311C16.2122 0.901968 16.0167 1.00466 15.8563 1.15125C15.6959 1.29784 15.5761 1.48335 15.5084 1.68983L15.2886 2.35592L15.0655 1.68983C14.9178 1.26655 14.5766 0.951548 14.1434 0.85311C13.9321 0.801492 13.711 0.805492 13.5017 0.864721C13.2924 0.92395 13.102 1.03639 12.9491 1.19108C12.6341 1.50608 12.5061 1.95233 12.6078 2.38545C12.6586 2.59733 12.7627 2.7927 12.9103 2.95294C13.0579 3.11319 13.2441 3.23298 13.4511 3.30092ZM16.2041 1.9228C16.2631 1.74561 16.4075 1.61436 16.588 1.5717C16.6306 1.56186 16.6733 1.5553 16.7127 1.5553C16.8538 1.5553 16.9883 1.61108 17.0867 1.7128C17.218 1.84077 17.2738 2.03108 17.2311 2.21155C17.1852 2.3953 17.0539 2.53967 16.8767 2.59874L15.8595 2.9367L16.2041 1.9228ZM13.4708 1.71608C13.5725 1.61436 13.707 1.55858 13.8481 1.55858C13.8908 1.55858 13.9334 1.56514 13.9761 1.57499C14.1566 1.61764 14.3009 1.74889 14.36 1.92608L14.698 2.94327L13.6808 2.6053C13.5036 2.54624 13.3723 2.40186 13.3264 2.22139C13.287 2.03436 13.3395 1.84733 13.4708 1.71608Z" fill="#8A8A8A" />
                  </g>
                  <defs>
                    <clipPath id="clip0_75_2858">
                      <rect width="21" height="21" fill="white" transform="translate(0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                <span>Contact</span>
              </li>
            </ul>
          </nav>
          <div className="header__bottom__list">
            <ul>
              <li>About</li>
              <li>Support</li>
              <li>Terms & Condition</li>
            </ul>
          </div>
        </div>

      </header>
      <main>
        <div className="main__header">
          this is header
        </div>

        <div className="main__block">
          <h2>Some good books...</h2>
          <div>
            <h2>Случайные книги</h2>
            <ul>
              {randomBooks.map((book, index) => (
                <li key={index}>
                  <h3>{book.title}</h3>
                  <p>Автор: {book.author}</p>
                  <p>Жанр: {book.genre}</p>
                  <p>Год: {book.year}</p>
                  {book.cover && <img src={book.cover} alt="Обложка книги" />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;