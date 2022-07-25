class Forca {
  // 1. O jogo deve iniciar com 6 vidas
	vidas = 6;
  // 2. O jogo deve iniciar com o estado aguardando chute.
	estado = 'aguardando chute';
	letrasChutadas = [];

	constructor(palavra) {
		this.palavraSecreta = palavra;
		this.letrasRestantes = palavra.toLowerCase();
		this.palavraUsuario = new Array(palavra.length).fill('_');
	}

	chutar(letra) {

		letra = letra.toLowerCase();

    // 3.  Todo chute deve conter apenas uma letra, caso tenha mais de uma a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado.
		if (letra.length > 1) {
      console.log('Só é possível digitar uma letra');
      return;
    } 

    // 4. Caso a letra chutada esteja errada mas já foi chutada anteriormente a jogada deve ser ignorada, ou seja, não deve alterar nenhum estado.
		if (this.letrasChutadas.includes(letra)) {
      return;
    }  

    // 5. Toda chamada ao método chutar deve registrar a letra em letrasChutadas
		this.letrasChutadas.push(letra);

		// 6.Se a letra chutada não estiver contida na palavra, deve subtrair uma vida
		if (!this.palavraSecreta.includes(letra)) {
			this.vidas--;
		} else {
      // 7. Se a letra chutada estiver contida na palavra, deve ser substituida na "palavra" em sua respectiva posição. Ex.: A palavra secreta é "bala" e o jogador chutou a letra "b", então a palavra que é retornada no método buscarDadosDoJogo, deve ser ["b", "", "", "_" ].
			this.letrasRestantes = this.letrasRestantes.replaceAll(letra, '');

			for (var i = 0; i < this.palavraSecreta.length; i++) {
				if (this.palavraSecreta[i] == letra) {
					this.palavraUsuario[i] = letra;
				}
			}
		}

    // 8. Caso a quantidade de vidas chegue a 0 (zero), o estado do jogo deve mudar para perdeu.
    if (this.vidas <= 0) {
      this.estado = 'perdeu';
    } else {
      // 9. Caso a quantidade de vidas seja maior que zero e o jogador acerte a última letra, o estado do jogo deve mudar para ganhou.
      if (this.letrasRestantes == '') {
        this.estado = 'ganhou';
      } else {
        this.estado = 'aguardando chute';
      }
    }
	}

	buscarEstado() {
		return this.estado;
	} // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

	buscarDadosDoJogo() {
		return {
			letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
			vidas: this.vidas, // Quantidade de vidas restantes
			palavra: this.palavraUsuario, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
		};
	}
}

module.exports = Forca;
