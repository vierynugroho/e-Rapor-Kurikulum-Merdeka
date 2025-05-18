// ===================
// TODO: fizzbuzz
// ===================
// 1. case fizzBuzz
// kelipatan 3 menampilkan fizz
// kelipatan 5 menampilkan buzz
// kelipatan keduanya menampilkan fizzBuzz
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log('FizzBuzz');
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else if (i % 5 === 0) {
            console.log('Buzz');
        } else {
            console.log(i);
        }
    }
}

const fb = fizzBuzz(15);
console.log(fb);

// ===================
// TODO: sum data
// ===================

const numbers = [1, 2, 3, 4, 5];

const total = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(total);

// ===================
// TODO: hitung berapa kali huruf muncul
// ===================
function charFrequency(str) {
    const frequency = {};

    for (let char of str) {
        if (char !== ' ') {
            frequency[char] = (frequency[char] || 0) + 1;
        }
    }

    return frequency;
}

const charFreq = charFrequency('Hello World');
console.log(charFreq);

// ===================
// TODO: grouping
// ===================

const groupedData = [
    { name: 'John', age: 20, city: 'Bandung' },
    { name: 'Jane', age: 20, city: 'Jakarta' },
    { name: 'Ipsum', age: 20, city: 'Yogyakarta' },
    { name: 'Bob', age: 30, city: 'Malang' },
    { name: 'Smith', age: 30, city: 'Bandung' },
];

const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        result[group] = result[group] || [];
        result[group].push(item);
        return result;
    }, {});
};

const grouped = groupBy(groupedData, 'city');
console.log(grouped);

// ===================
// TODO: real case
// ===================
// terdapat array berisi daftar transaksi pembelian dari sebuah toko.
// Buat fungsi untuk menghasilkan ringkasan dalam bentuk object yang berisi:

// 1. Total jumlah transaksi.
// 2. Total pendapatan.
// 3. Produk yang paling sering dibeli (top 1).

//? expected output
// {
//   totalTransactions: 6,
//   totalRevenue: 35900000,
//   mostSoldProduct: "Mouse"
// }

const transactions = [
    { id: 1, product: 'Laptop', amount: 1000 },
    { id: 2, product: 'Mouse', amount: 2000 },
    { id: 3, product: 'Keyboard', amount: 5000 },
    { id: 4, product: 'Mouse', amount: 2000 },
    { id: 5, product: 'Laptop', amount: 1500 },
    { id: 6, product: 'Mouse', amount: 2000 },
];

function getTransactionSummary(transactions) {
    const totalTransactions = transactions.length;

    const totalRevenue = transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0,
    );

    const productCount = {};
    transactions.forEach(transaction => {
        productCount[transaction.product] =
            (productCount[transaction.product] || 0) + 1;
    });

    const mostSoldProduct = Object.entries(productCount).sort(
        (a, b) => b[1] - a[1], // sort desc
    )[0][0]; // get value

    // console.log(productCount); // { Laptop: 2, Mouse: 3, Keyboard: 1 }
    // console.log(Object.entries(productCount)); // [ [ 'Laptop', 2 ], [ 'Mouse', 3 ], [ 'Keyboard', 1 ] ]

    return {
        totalTransactions,
        totalRevenue,
        mostSoldProduct,
    };
}

const summary = getTransactionSummary(transactions);
console.log(summary);
