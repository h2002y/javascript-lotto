class Lotto {
  #numbers;

  constructor(numbers) {
    this.checkLottoOverlap(numbers);
    this.validate(numbers);
    this.#numbers = numbers;
  }

  checkLottoOverlap(numbers) {
    const lottoOverlap = new Map();
    for (let i = 0; i < numbers.length; i++) {
      if (!lottoOverlap.has(numbers[i])) {
        lottoOverlap.set(numbers[i], 1);
      }
      else {
        throw new Error("[ERROR] 로또 번호는 중복되는 숫자가 없어야 합니다.");
      }
    }
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  // TODO: 추가 기능 구현
}

module.exports = Lotto;
