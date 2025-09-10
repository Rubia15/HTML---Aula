interface ILivro {
    titulo: string;
    ano: number;
    isbn: number;
    preco: number;
    autor: string;
    editora: string;
    estoque: number;
    
    exibirDados(): void ;
    atualizarEstoque(quantidade: number): void;
    }
    class LivroFisico implements ILivro {
    titulo: string;
    ano: number;
    isbn: number;
    preco: number;
    autor: string;
    editora: string;
    estoque: number;
    
    constructor(titulo: string, ano: number, isbn: number, preco: number, autor: string, editora:
    string, estoque: number,){
    this.titulo = titulo;
    this.ano = ano;
    this.isbn = isbn;
    this.preco = preco;
    this.autor = autor;
    this.editora = editora;
    this.estoque = estoque;
    }
    exibirDados(): void {
    console.log(`Titulo: ${this.titulo}`);
    console.log(`Ano: ${this.ano}`);
    console.log(`ISBN: ${this.isbn}`);
    console.log(`Preco: ${this.preco}`);
    console.log(`Autor: ${this.autor}`);
    
    console.log(`Editora: ${this.editora}`);
    console.log(`Estoque: ${this.estoque}`);
    }
    atualizarEstoque(quantidade: number): void {
    this.estoque += quantidade;
    }
    }
    class EbookLivro extends LivroFisico {
    arquivoTam: number;
    
    constructor(titulo: string, ano: number, isbn: number, preco: number, autor: string, editora:
    string, estoque: number, arquivoTam: number) {
    super(titulo, ano, isbn, preco, autor, editora, estoque);
    this.arquivoTam = arquivoTam;
    }
    exibirDados(): void {
    super.exibirDados();
    console.log(`O tamanho do arquivo: ${this.arquivoTam} MB`);
    }
    }
    class GerenciarLivraria {
    private livros: ILivro[] = [];
    
    adicionarLivro(livro: ILivro): void {
    this.livros.push(livro);
    }
    
    excluirLivro(isbn: number): void {
    this.livros = this.livros.filter(livro => livro.isbn !== isbn);
    }
    
    venderLivro(isbn: number): void {
    const livro = this.livros.find(l => l.isbn === isbn);
    if (livro) {
    if (livro.estoque > 0) {
    livro.atualizarEstoque(-1);
    console.log(`Livro vendido: ${livro.titulo}`);
    } else {
    console.log(`Esgotado o livro: ${livro.titulo}`);
    }
    } else {
    console.log(`O ISBN do livro ${isbn} não foi encontrado.`);
    }
    
    }
    
    listarLivros(): void {
    this.livros.forEach(livro => {
    livro.exibirDados();
    console.log('--'); });
    }
    }
    
    const livro2 = new LivroFisico("Angus: O primeiro guerreiro", 2003, 1234, 29.90, "Orlando Paes Filho", "Nova Página", 20);
    const livraria = new GerenciarLivraria();
    
    livraria.adicionarLivro(livro2);
    livro2.exibirDados();