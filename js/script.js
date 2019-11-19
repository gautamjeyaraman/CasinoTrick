
(function() {

	const ROUND_BET_AMOUNT = 10;
	const PLAYER_START_AMOUNT = 100;
	const PLAYER_END_AMOUNT = 1000;
	const PLAYERS_COUNT = 15;
	const REFRESH_RATE = 50;
	const DEFAULT_POSITION = 350;

	let casinoBalance = 0;
	let onTable = 0;

	class Player {
		constructor(id) {
			this.id = id;
			this.balance = PLAYER_START_AMOUNT;
			this.position = DEFAULT_POSITION;
			onTable += PLAYER_START_AMOUNT;

			this.element = $(document.createElement("div"));
			this.element.attr("id", "gameBox" + id);
			this.element.attr("class", "gameBox");
			$("#mainFrame").append(this.element);

			this.balanceDiv = $(document.createElement("div"));
			this.balanceDiv.attr("id", "balance" + id);
			this.balanceDiv.attr("class", "balance");
			$("#mainFrame").append(this.balanceDiv);

			this.render();
		}

		win() {
			const position = this.element.position();
			this.balance += ROUND_BET_AMOUNT;
			this.position = position.top - ROUND_BET_AMOUNT;
			onTable += ROUND_BET_AMOUNT;
		}

		lose() {
			const position = this.element.position();
			this.balance -= ROUND_BET_AMOUNT;
			this.position = position.top + ROUND_BET_AMOUNT;
			onTable -= ROUND_BET_AMOUNT;
		}

		resetGame() {
			this.balance = PLAYER_START_AMOUNT;
			this.position = DEFAULT_POSITION;
			onTable += PLAYER_START_AMOUNT;
		}

		play() {
			if (this.balance < 1) {
				casinoBalance += 100;
				this.resetGame();
				this.render();
				return;
			}
			if (this.balance >= PLAYER_END_AMOUNT) {
				casinoBalance -= PLAYER_END_AMOUNT;
				onTable -= (PLAYER_START_AMOUNT * 5);
				this.resetGame();
				this.render();
				return;
			}
			if (getRandomBool()) {
				this.win();
			} else {
				this.lose();
			}
			this.render();
		}

		render() {
			const leftValue = (this.id+1)*60;
			this.element.css({
				'left': leftValue + 'px',
				'top': this.position + 'px',
			});
			this.balanceDiv.css({
				'left': leftValue + 'px',
			});
			this.balanceDiv.html("$" + this.balance);
			$("#resetCount").html("$" + casinoBalance);
			$("#onTable").html("$" + onTable);
		}
	}

	function getRandomBool() {
		return Math.random() >= 0.5;
	}


	function main(){
		for(let i=0; i<PLAYERS_COUNT; i++) {
			const player = new Player(i);
			setInterval(() => {
				player.play();
				
			}, REFRESH_RATE);
		}
	}


	main();

})();