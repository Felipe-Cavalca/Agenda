function Contato(id, nome, telefone, email, endereco) {
    //inicializa funções
    this.SetId = SetId;
    this.GetId = GetId;
    this.SetNome = SetNome;
    this.GetNome = GetNome;
    this.SetTelefone = SetTelefone;
    this.GetTelefone = GetTelefone;
    this.SetEmail = SetEmail;
    this.GetEmail = GetEmail;
    this.SetEndereco = SetEndereco;
    this.GetEndereco = GetEndereco;

    //construtor
    this.SetId(id);
    this.SetNome(nome);
    this.SetEmail(email);
    this.SetTelefone(telefone);
    this.SetEndereco(endereco);

    //funções
    function SetId(id){
        this.id = id;
    }

    function GetId(){
        return this.id;
    }

    function SetNome(nome){
        this.nome = nome;
    }

    function GetNome(){
        return this.nome;
    }

    function SetTelefone(telefone){
        this.telefone = telefone;
    }

    function GetTelefone(){
        return this.telefone;
    }

    function SetEmail(email){
        this.email = email;
    }

    function GetEmail(){
        return this.email;
    }

    function SetEndereco(endereco){
        this.endereco = endereco
    }

    function GetEndereco(){
        return this.endereco;
    }
}

function homeContatos(elemento){
    var escrever = "";
    document.getElementById(elemento).innerHTML = escrever;
}