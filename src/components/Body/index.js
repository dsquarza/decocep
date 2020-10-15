import React, { Component } from 'react';
import './styles.css';
import api from '../../services/api';

export default class Body extends Component{
    state = {
        endereco: [],
    }
       
    buscaCep = async(e) => {
        e.preventDefault();
    
        let artEl = document.querySelector('#Deco-resp');
        let inputEl = document.querySelector('#Deco-input');
        let cep = inputEl.value;

        try{
            const response = await api.get(`${cep}/json/`);
            this.setState({endereco: response.data});                         
            console.log(this.state.endereco);     
            
            const {endereco} = this.state;  
            let strEl = document.createElement('strong');
            let p1 = document.createElement('p');
            let p2 = document.createElement('p');

            strEl.appendChild(document.createTextNode(`Logradouro: ${endereco.logradouro}`));
            p1.appendChild(document.createTextNode(`Bairro: ${endereco.bairro}`));
            p2.appendChild(document.createTextNode(`Cidade: ${endereco.localidade} - ${endereco.uf}`));
            
            artEl.innerHTML = '';
            artEl.appendChild(strEl);
            artEl.appendChild(p1);
            artEl.appendChild(p2);    
            
            inputEl.value = '';      
    
        } catch(err){
            alert('CEP não encontrado!');
        }
    }

    render(){          
        return (
            <div id='Deco-body'>
                <div id='side1'/>
                <div id='entrada'>
                    <form onSubmit={this.buscaCep} id='Deco-form'>
                        <input id='Deco-input' required/>
                        <div id='underline'/>
                        <label>CEP</label>
                    </form>
                </div>
                <article id='Deco-resp'></article>
                <div id='side2'/>
            </div>           
        )
    }
}
