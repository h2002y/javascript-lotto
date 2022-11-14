const { Random, Console } = require("@woowacourse/mission-utils");
const { validateMoney } = require("./Money");
const { validateBonusNumber } = require("./BonusNumber");
const Lotto = require("./Lotto");

const lottoPrizePrice = [5000, 50000, 1500000, 30000000, 2000000000];
const firstPrize = 4, secondPrize = 3, thirdPrize = 2, fourthPrize = 1, fifthPrize = 0;

class App {
  #money;
  #numOfLotto;
  #userLotto;
  #winLotto;
  #bonusNumber;
  #totalProfitMoney;
  #percent;

  constructor() {
    this.#userLotto = [];
    this.#winLotto = [];
    this.lottoPrizeResult = [0, 0, 0, 0, 0];
    this.lottoCmpResult = [];
  }

  play() {
    this.getMoney();
  }

  getMoney() {
    Console.readLine("구입금액을 입력해 주세요.\n", (money) => {
      validateMoney(money);
      this.#money = money;
      this.getNumOfLotto();
    });
  }
  
  getNumOfLotto() {
    this.#numOfLotto = this.#money / 1000;
    this.buyLotto();
  }

  buyLotto() {
    for(let i = 0; i < this.#numOfLotto; i++) {
      let tmp = Random.pickUniqueNumbersInRange(1, 45, 6);
      tmp = tmp.sort((a,b) => a - b);
      this.#userLotto.push(tmp);
    }
    this.printBuyLotto();
  }

  printBuyLotto() {
    Console.print(`\n${this.#numOfLotto}개를 구매했습니다.`);
    this.#userLotto.forEach((lotto) => Console.print(`[${lotto.join(", ")}]`));
    this.getWinLotto();
  }

  getWinLotto() {
    Console.readLine("\n당첨 번호를 입력해 주세요.\n", (winLotto) => {
      let tmp = winLotto.split(',');
      for(let i = 0; i < tmp.length; i++) {
        tmp[i] = Number(tmp[i]);
      }
      new Lotto(tmp);
      this.#winLotto = tmp;
      getBonusNumber();
    });
  }

  getBonusNumber() {
    Console.readLine("\n보너스 번호를 입력해 주세요.\n", (bonusNumber) => {
      validateBonusNumber(bonusNumber, this.#winLotto);
      this.#bonusNumber = bonusNumber;
      this.compareLottoResult();
    });
  }

  compareLottoResult() {
    for(let i = 0; i < this.#userLotto.length; i++) {
      let numOfMatch = 0;
      for( let j = 0; j < this.#winLotto; j++) {
        if(this.#userLotto[i].includes(this.#winLotto[j])){
          numOfMatch++;
        }
      }
      this.lottoCmpResult[i].push(numOfMatch);
    }
    this.getLottoResult();
  }
}

const app = new App();
app.play();

module.exports = App;
