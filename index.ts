// Import stylesheets
import './style.css';

// Write TypeScript code!

class Book {
  constructor(
    readonly author: string,
    readonly title: string,
    readonly year: number,
    readonly weight: number,
    readonly pages: number
  ) {}
}

class Bookshelf {
  private data: Array<Book> = [];

  addBook(
    author: string,
    title: string,
    year: number,
    weight: number,
    pages: number
  ): void {
    this.data.push(new Book(author, title, year, weight, pages));
  }

  getBooks(targetYear: number): Array<Book> {
    return this.data.filter((book) => book.year === targetYear);
  }

  getLightestAuthor(): string {
    return this.data.sort((a, b) => a.weight - b.weight)[0]?.author;
  }

  getAuthorOfMostWrittenPages(): string {
    const authorToTotalPagesMap: { [key: string]: number } = this.data.reduce(
      (map, curr) => {
        map[curr.author] !== undefined
          ? (map[curr.author] += curr.pages)
          : (map[curr.author] = curr.pages);
        return map;
      },
      {}
    );
    const [winnerAuthorName, authoredPages] = Object.entries(
      authorToTotalPagesMap
    ).sort(([authorA, pagesA], [authorB, pagesB]) => pagesB - pagesA)[0];

    return winnerAuthorName;
  }
}

const bs = new Bookshelf();
bs.addBook('author 1', 'title 1', 1994, 30, 12);
bs.addBook('author 2', 'title 2', 2012, 70, 30);
bs.addBook('author 1', 'title 3', 2011, 300, 100);
bs.addBook('author 3', 'title 4', 2012, 330, 120);
bs.addBook('author 4', 'title 5', 2012, 210, 200);

console.log({ bs });
console.log('get books:', bs.getBooks(2012));
console.log('get lightest author:', bs.getLightestAuthor());
console.log(
  'get author of most written pages:',
  bs.getAuthorOfMostWrittenPages()
);
