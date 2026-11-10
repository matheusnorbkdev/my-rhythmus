export class Alongamento {
    constructor(
        id,
        nome,
        parte,
        esportes,
        duracao = "",
        dificuldade = "",
        imagemURL = ""
    ) {
        this.id = id;
        this.nome = nome;
        this.parte = parte;
        this.esportes = esportes;
        this.duracao = duracao;
        this.dificuldade = dificuldade;
        this.imagemURL = imagemURL;
    }
}

export default Alongamento;