function fibonacci(n) {

  if (n === 0) {
    return [0];
  }
  if (n === 1) {
    return [0, 1];
  }

  const lala = fibonacci(n - 1);

  lala.push(lala[n - 1] + lala[n - 2]);

  return lala;
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
