const { residencialSocial } = require('./tarifasBA.json');

function CalculaAgua(consumo) {
    const valorFixo = residencialSocial.valorFixo;
    const aliquotas = residencialSocial.aliquotas;
    const quantidadeDeAliquotas = aliquotas.length;
    const faixasDeConsumo = residencialSocial.faixasDeConsumo;
    const quantidadeDeFaixas = faixasDeConsumo.length;
    let faixaAtual = 0;

    function VerificaFaixaAtual() {
        for (let i=0; i < quantidadeDeFaixas; i++) {
            if (i===quantidadeDeFaixas-1) {
                faixaAtual = i+1;
                break;
            }
            else if (consumo > faixasDeConsumo[i] && consumo <= faixasDeConsumo[i+1]){
                faixaAtual = i;
                break;
            }
        }
    }
 
    function CalculaPrecoPorFaixa(){
        let precoPorFaixa = [0];
        for(let i=1; i < quantidadeDeAliquotas; i++){
            precoPorFaixa.push(aliquotas[i] * (faixasDeConsumo[i+1] - faixasDeConsumo[i]));
        }
        return precoPorFaixa;
    }
    
    function CalculaPrecoTotalFaixas(faixaAtual, precoPorFaixa) {
        let precoTotalFaixas = 0;
        for (let i=1; i < faixaAtual; i++) {
            precoTotalFaixas += precoPorFaixa[i];
        }
        return precoTotalFaixas;
    };
 
    function CalculaValorVariavel(faixaAtual, precoTotalFaixas) {
        let valorVariavel = (aliquotas[faixaAtual] * (consumo - faixasDeConsumo[faixaAtual])) + precoTotalFaixas;
        return valorVariavel;
    }

    VerificaFaixaAtual();
    const precoPorFaixa = CalculaPrecoPorFaixa();
    const precoTotalFaixas = CalculaPrecoTotalFaixas(faixaAtual, precoPorFaixa);
    const valorVariavel = CalculaValorVariavel(faixaAtual, precoTotalFaixas);
    const tarifa = valorFixo + valorVariavel;
 
    console.log(tarifa);
}
 
CalculaAgua(10);