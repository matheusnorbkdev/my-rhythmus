export class Mobilidade {
    constructor(
        id,
        nome,
        articulacao,
        esportes,
        repeticoes = "",
        dificuldade = "",
        imagemURL = ""
    ) {
        this.id = id;
        this.nome = nome;
        this.articulacao = articulacao;
        this.esportes = esportes;
        this.repeticoes = repeticoes;
        this.dificuldade = dificuldade;
        this.imagemURL = imagemURL;
    }
}

export default Mobilidade;