import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity, Modal, CheckBox, Pressable, FlatList, Button, ScrollView, TextInput, Alert } from 'react-native';
import banco from '../../database/models/db-initFiltro'
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import ModalFiltro from '../../components/ModalFiltro';
//<ModalFiltro />

import MyJson from '../../../json/filtro.json';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { render } from 'react-dom';

let selectedAssunto = [];

let dataAssuntos = [];

export default function Concurso() {
  const navigation = useNavigation();

  const [disciplinas, setDisciplinas] = useState(dataDisciplina);
  const [assuntos, setAssuntos] = useState('')
  const [escolaridades, setEscolaridades] = useState(dataFiltroEscolaridade);
  const [anos, setAnos] = useState(dataFiltroAno);
  const [bancas, setBancas] = useState(dataFiltroBanca);
  const [areas, setAreas] = useState(dataFiltroArea);
  const [formacoes, setFormacao] = useState(dataFiltroFormacao);
  const [regioes, setRegioes] = useState(dataFiltroRegiao);
  const [orgaoCargos, setOrgaoCargo] = useState(dataFiltroOrgaoCargo);
  const [modalidades, setModalidades] = useState(dataFiltroModalidades);

  const [filtrosSalvos, setFiltrosSalvos] = useState(dataDisciplina);

  // --------------------------------------- INICIO MATERIA ---------------------------------------------------------------------//
  const handleChangeMateria = (id) => {
    let temp = disciplinas.map((disciplina) => {
      if (id === disciplina.id) {
        return { ...disciplina, isChecked: !disciplina.isChecked };
      }
      return disciplina;
    });
    setDisciplinas(temp);

    temp.map(myMaterias => {
      let teste;
      let posicaoVet = 1;
      let idDate = []
      console.log(myMaterias)
      let idExclusao = 0;
      if (myMaterias.isChecked === false) {
        dataAssuntos.map(excluirData => {
          console.log('é o que', excluirData)
          if (excluirData.materia === myMaterias.txt) {
            idExclusao = excluirData.id;
            idDate.push(idExclusao)
            console.log('OS IDS QUE SERÂO EXCLUIDOS: ', idExclusao)
          }
        })

        if (dataAssuntos) {
          console.log('ENTROU NO ARRAY')

        }
      } else if (myMaterias.isChecked === true) {
        dataFiltroAssuntos.map(filtro => {
          if (myMaterias.txt === filtro.disciplina) {
            teste = filtro.assunto;
            dataAssuntos.push({ id: teste, materia: myMaterias.txt, txt: filtro.assunto, isChecked: false })

          }
        })
      }

      function getUnique(arr, index) {

        const unique = arr
          .map(e => e[index])

          // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)

          // eliminate the dead keys & store unique objects
          .filter(e => arr[e]).map(e => arr[e]);

        return unique;
      }

      let pos = 0;
      while (idDate[pos]) {
        console.log(idDate[pos])
        removerPorId(dataAssuntos, idDate[pos])
        pos++
      }

      const dataAssuntoTratado = getUnique(dataAssuntos, 'id');
      setAssuntos(dataAssuntoTratado)

      function removerPorId(array, id) {
        console.log('QUAL FOI ID EXCLUIDO: ', id)
        var result = array.filter(function (el) {
          return el.id == id;
        });

        for (var elemento of result) {
          var index = array.indexOf(elemento);
          array.splice(index, 1);
        }
      }

    })
  };

  const renderFlatListMateria = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',

                  //alignItems: 'center'
                }}>
                <CheckBox
                  style={{}}
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeMateria(item.id);
                  }}
                />
                <Text style={{}}>{item.txt}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  // SELECT CHEKBOX TRUE
  const renderMateria = () => {
    return selectedDisciplinas.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Matéria: {item.txt}</Text>);
  }
  // ---------------------------------------FIM MATERIA ---------------------------------------------------------------------//


  // --------------------------------------- INICIO ASSUNTO ---------------------------------------------------------------------//

  const handleChangeAssunto = (id) => {
    let temp = assuntos.map((assunto) => {
      if (id === assunto.id) {
        return { ...assunto, isChecked: !assunto.isChecked };
      }

      return assunto;
    });
    //console.log(temp)
    setAssuntos(temp);
  };

  const renderFlatListAssunto = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeAssunto(item.id);
                  }}
                />
                <Text>{item.txt}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedDisciplinas = disciplinas.filter((disciplina) => disciplina.isChecked);
  if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }
  console.log(selectedAssunto)

  const renderAssuntos = () => {
    if (selectedAssunto) {
      return selectedAssunto.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Assunto: {item.txt}</Text>)
    }
  }


  // ---------------------------------------FIM ASSUNTO ---------------------------------------------------------------------//


  // --------------------------------------- INICIO ESCOLARIDADE ---------------------------------------------------------------------//

  const handleChangeEscolaridade = (id) => {
    let temp = escolaridades.map((escolaridade) => {
      if (id === escolaridade.id) {
        return { ...escolaridade, isChecked: !escolaridade.isChecked };
      }

      return escolaridade;
    });
    console.log(temp)
    setEscolaridades(temp);
  };

  const renderFlatListEscolaridade = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeEscolaridade(item.id);
                  }}
                />
                <Text>{item.escolaridade}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedEscolaridade = escolaridades.filter((escolaridade) => escolaridade.isChecked);
  /*if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }  */
  console.log(selectedEscolaridade)

  const renderEscolaridade = () => {
    if (selectedEscolaridade) {
      return selectedEscolaridade.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Escolaridade: {item.escolaridade}</Text>)
    }
  }

  // ---------------------------------------FIM ESCOLARIDADE ---------------------------------------------------------------------//



  // --------------------------------------- INICIO ANO ---------------------------------------------------------------------//

  const handleChangeAno = (id) => {
    let temp = anos.map((ano) => {
      if (id === ano.id) {
        return { ...ano, isChecked: !ano.isChecked };
      }

      return ano;
    });
    console.log(temp)
    setAnos(temp);
  };

  const renderFlatListAno = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeAno(item.id);
                  }}
                />
                <Text>{item.ano}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedAno = anos.filter((ano) => ano.isChecked);
  /*if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }  */
  console.log(selectedAno)

  const renderAno = () => {
    if (selectedAno) {
      return selectedAno.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Ano: {item.ano}</Text>)
    }
  }

  // ---------------------------------------FIM ANO ---------------------------------------------------------------------//



  // --------------------------------------- INICIO BANCA ---------------------------------------------------------------------//

  const handleChangeBanca = (id) => {
    let temp = bancas.map((banca) => {
      if (id === banca.id) {
        return { ...banca, isChecked: !banca.isChecked };
      }

      return banca;
    });
    console.log(temp)
    setBancas(temp);
  };

  const renderFlatListBanca = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeBanca(item.id);
                  }}
                />
                <Text>{item.banca}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedBanca = bancas.filter((banca) => banca.isChecked);
  /*if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }  */
  console.log(selectedBanca)

  const renderBanca = () => {
    if (selectedBanca) {
      return selectedBanca.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Banca: {item.banca}</Text>)
    }
  }

  // ---------------------------------------FIM BANCA ---------------------------------------------------------------------//


  // --------------------------------------- INICIO AREA ---------------------------------------------------------------------//

  const handleChangeArea = (id) => {
    let temp = areas.map((area) => {
      if (id === area.id) {
        return { ...area, isChecked: !area.isChecked };
      }
      return area;
    });
    console.log(temp)
    setAreas(temp);
  };

  const renderFlatListArea = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeArea(item.id);
                  }}
                />
                <Text>{item.area}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedArea = areas.filter((area) => area.isChecked);
  /*if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }  */
  console.log(selectedArea)

  const renderArea = () => {
    if (selectedArea) {
      return selectedArea.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Área: {item.area}</Text>)
    }
  }

  // ---------------------------------------FIM AREA ---------------------------------------------------------------------//



  // --------------------------------------- INICIO FORMAÇÃO ---------------------------------------------------------------------//

  const handleChangeFormacao = (id) => {
    let temp = formacoes.map((formacao) => {
      if (id === formacao.id) {
        return { ...formacao, isChecked: !formacao.isChecked };
      }
      return formacao;
    });
    console.log(temp)
    setFormacao(temp);
  };

  const renderFlatListFormacao = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeFormacao(item.id);
                  }}
                />
                <Text>{item.formacao}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedFormacao = formacoes.filter((formacao) => formacao.isChecked);
  /*if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }  */
  console.log(selectedFormacao)

  const renderFormacao = () => {
    if (selectedFormacao) {
      return selectedFormacao.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Formação: {item.formacao}</Text>)
    }
  }

  // ---------------------------------------FIM FORMAÇÃO ---------------------------------------------------------------------//



  // --------------------------------------- INICIO REGIÃO ---------------------------------------------------------------------//

  const handleChangeRegiao = (id) => {
    let temp = regioes.map((regiao) => {
      if (id === regiao.id) {
        return { ...regiao, isChecked: !regiao.isChecked };
      }
      return regiao;
    });
    console.log(temp)
    setRegioes(temp);
  };

  const renderFlatListRegiao = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeRegiao(item.id);
                  }}
                />
                <Text>{item.regiao}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedRegiao = regioes.filter((regiao) => regiao.isChecked);
  /*if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }  */
  console.log(selectedRegiao)

  const renderRegiao = () => {
    if (selectedRegiao) {
      return selectedRegiao.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Região: {item.regiao}</Text>)
    }
  }

  // ---------------------------------------FIM REGIÃO ---------------------------------------------------------------------//



  // --------------------------------------- INICIO ORGAO E CARGO ---------------------------------------------------------------------//

  const handleChangeOrgaoCargo = (id) => {
    let temp = orgaoCargos.map((orgaoCargo) => {
      if (id === orgaoCargo.id) {
        return { ...orgaoCargo, isChecked: !orgaoCargo.isChecked };
      }
      return orgaoCargo;
    });
    console.log(temp)
    setOrgaoCargo(temp);
  };

  const renderFlatListOrgaoCargo = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeOrgaoCargo(item.id);
                  }}
                />
                <Text>{item.orgaoCargo}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedOrgaoCargo = orgaoCargos.filter((orgaoCargo) => orgaoCargo.isChecked);
  /*if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }  */
  console.log(selectedOrgaoCargo)

  const renderOrgaoCargo = () => {
    if (selectedOrgaoCargo) {
      return selectedOrgaoCargo.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Orgão e Cargo: {item.orgaoCargo}</Text>)
    }
  }

  // ---------------------------------------FIM ORGAO E CARGO ---------------------------------------------------------------------//



  // --------------------------------------- INICIO MODALIDADES ---------------------------------------------------------------------//

  const handleChangeModalidade = (id) => {
    let temp = modalidades.map((modalidade) => {
      if (id === modalidade.id) {
        return { ...modalidade, isChecked: !modalidade.isChecked };
      }
      return modalidade;
    });
    console.log(temp)
    setModalidades(temp);
  };

  const renderFlatListModalidade = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }}>
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'flex-start',
                }}>
                <CheckBox
                  value={item.isChecked}
                  onChange={() => {
                    handleChangeModalidade(item.id);
                  }}
                />
                <Text>{item.modalidade}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    );
  };

  //Select CHEKBOX TRUE
  let selectedModalidade = modalidades.filter((modalidade) => modalidade.isChecked);
  /*if (assuntos) {
    selectedAssunto = assuntos.filter((assunto) => assunto.isChecked);
  }  */
  console.log(selectedModalidade)

  const renderModalidade = () => {
    if (selectedModalidade) {
      return selectedModalidade.map((item, index) => <Text style={{ color: '#FFF', fontWeight: 'bold' }} key={index}>     Modalidades: {item.modalidade}</Text>)
    }
  }

  // ---------------------------------------FIM MODALIDADES ---------------------------------------------------------------------//







  /*

  {
    selectedDisciplinas.map(cr => {
      <Text style={{ color: '#FFF' }}>PPP {cr.txt}</Text>
    })
  }   */

  const [modalVisibleMateria, setModalVisibleMateria] = useState(false);
  const [modalVisibleAssunto, setModalVisibleAssunto] = useState(false);
  const [modalVisibleEscolaridade, setModalVisibleEscolaridade] = useState(false);
  const [modalVisibleAno, setModalVisibleAno] = useState(false);
  const [modalVisibleBanca, setModalVisibleBanca] = useState(false);
  const [modalVisibleArea, setModalVisibleArea] = useState(false);
  const [modalVisibleFormacao, setModalVisibleFormacao] = useState(false);
  const [modalVisibleRegiao, setModalVisibleRegiao] = useState(false);
  const [modalVisibleOrgaoCargo, setModalVisibleOrgaoCargo] = useState(false);
  const [modalVisibleModalidade, setModalVisibleModalidade] = useState(false);

  const [modalVisibleSalvarFiltro, setModalVisibleSalvarFiltro] = useState(false)
  const [modalVisibleFiltroSalvo, setModalVisibleFiltroSalvo] = useState(false)

  const [myInput, setmyInput] = useState('');
  const [placeholderSalvarFiltro, setPlaceholderSalvarFiltro] = useState('Informe o nome do seu filtro')




  const handleCancelarFiltro = () => {
    console.log('CANCELADO')
    setModalVisibleSalvarFiltro(false);
    setmyInput('')
  };

  const handleCancelarFiltroSalvos = () => {
    console.log('handleCancelarFiltroSAlvos')
    setModalVisibleFiltroSalvo(false);
  }

  const handleSalvarFiltro = () => {
    let variavelDisciplinaBanco = ''
    let variavelAssuntoBanco = ''
    let variavelEscolaridadeBanco = ''
    let variavelAnoBanco = ''
    let variavelBancaBanco = ''
    let variavelAreaBanco = ''
    let variavelFormacaoBanco = ''
    let variavelRegiaoBanco = ''
    let variavelOrgaoCargoBanco = ''
    let variavelModalidadeBanco = ''
    console.log('MEU INPUT: ', myInput)
    if (myInput === '') {
      console.log('INPUT VAZIO')
      Alert.alert('Informe um nome para o filtro')
    } else if (myInput !== '') {


      { selectedDisciplinas && selectedDisciplinas.map(selectedDisciplina => variavelDisciplinaBanco += `${selectedDisciplina.txt} - `) }
      { selectedAssunto && selectedAssunto.map(item => variavelAssuntoBanco += `${item.txt} - `) }
      { selectedEscolaridade && selectedEscolaridade.map(item => variavelEscolaridadeBanco += `${item.txt} - `) }
      { selectedAno && selectedAno.map(item => variavelAnoBanco += `${item.txt} - `) }
      { selectedBanca && selectedBanca.map(item => variavelBancaBanco += `${item.txt} - `) }
      { selectedArea && selectedArea.map(item => variavelAreaBanco += `${item.txt} - `) }
      { selectedFormacao && selectedFormacao.map(item => variavelFormacaoBanco += `${item.txt} - `) }
      { selectedRegiao && selectedRegiao.map(item => variavelRegiaoBanco += `${item.txt} - `) }
      { selectedOrgaoCargo && selectedOrgaoCargo.map(item => variavelOrgaoCargoBanco += `${item.txt} - `) }
      { selectedModalidade && selectedModalidade.map(item => variavelModalidadeBanco += `${item.txt} - `) }

      console.log('SALVANDO FILTRO')
      setModalVisibleSalvarFiltro(false);
      setmyInput('')
      'selectedDisciplinas TEXT, selectedAssunto TEXT, selectedEscolaridade TEXT, selectedAno TEXT, selectedBanca TEXT, selectedArea TEXT, selectedFormacao TEXT, selectedRegiao TEXT, selectedOrgaoCargo TEXT, selectedModalidade TEXT'
      let obj = {
        nomeFiltro: myInput,
        selectedDisciplinas: `${variavelDisciplinaBanco}`,
        selectedAssunto: `${variavelAssuntoBanco}`,
        selectedEscolaridade: `${variavelEscolaridadeBanco}`,
        selectedAno: `${variavelAnoBanco}`,
        selectedBanca: `${variavelBancaBanco}`,
        selectedArea: `${variavelAreaBanco}`,
        selectedFormacao: `${variavelFormacaoBanco}`,
        selectedRegiao: `${variavelRegiaoBanco}`,
        selectedOrgaoCargo: `${variavelOrgaoCargoBanco}`,
        selectedModalidade: `${variavelModalidadeBanco}`,
      }

      banco.create(obj)



      disciplinas.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });
      assuntos.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });
      escolaridades.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });
      anos.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });
      areas.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });
      formacoes.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });
      regioes.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });
      orgaoCargos.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });
      modalidades.map((checked) => { checked.isChecked === true && (checked.isChecked = false) });


      /*
                if (disciplina.isChecked === true) {
                  console.log('ANTES', disciplina)
                  disciplina.isChecked = false;
                  console.log('DEPOIS', disciplina)
                  //setDisciplinas
                }   */
      //if (isChecked === disciplina.isChecked) {
      //        console.log(disciplina)
      // }
      //return disciplina;



    }

  };







  const [isSelected, setSelected] = useState(false);

  if (!modalVisibleMateria) {
    //console.log('ESTÀ COMO FALSE')
    //testeNovo()
  }




  async function dataDeAssuntos(modalVisibleMateria, selectedDisciplinas) {
    if (!modalVisibleMateria && selectedDisciplinas) {
      //console.log('MODAL DESATIVADO')
      selectedDisciplinas.map(disciplina => {
        //console.log(disciplina.txt)


      })



    } else {
      console.log('MODAL ATIVADO')

    }
  }




  dataDeAssuntos(modalVisibleMateria, selectedDisciplinas)
  // <Text>{renderFlatListMateria(dataDisciplina)}</Text>

  const modalFiltros = () => {
    setModalVisibleFiltroSalvo(true)

    const bbb = []
    const printCar = (banco) => {
      //console.log('USE  INICIOU')
      const id = banco.id.toString();
      bbb.push({ id, nomeFiltro: banco.nomefiltro })
      //console.log(id)
      setFiltrosSalvos(bbb)
      //console.log('MEU BANCO  ->  ', banco)
    }

    banco.all()
      .then(
        bancos => bancos.forEach(b => printCar(b))
      )

    console.log('MEU FILTRO ', filtrosSalvos)
  }

  const handleFiltroSelecionado = (filtroSelecionado) => {
    console.log('PROPS OPCAO FILTRO, ', filtroSelecionado)
    console.log('FECHANDO MODAL')

    setModalVisibleFiltroSalvo(false);
    navigation.navigate('ResolverQuestoes')
  }

  const handleResolverQuestoes = (filtroSelecionado) => {
    console.log('FUNCAO PAGINA RESOLVER QUESTOES', filtroSelecionado)
    //console.log('FUNCAO PAGINA RESOLVER QUESTOES', filtroSelecionado[0].props.children)
    //console.log('FUNCAO PAGINA RESOLVER QUESTOES', filtroSelecionado[1].props.children)
    //console.log('SELECIONADOS: ?? ', selectedDisciplinas)
    //const teste = 'MEU TESTE FOI'
    navigation.navigate('ResolverQuestoes', { selectedDisciplinas })
  }



  return (
    <SafeAreaView style={styles.container} >
      <View style={{ flexDirection: 'column' }}>
        <View style={{ width: '100%', height: '70%', alignItems: 'center' }}>
          <Text style={styles.corTextFiltro}>Escolher Filtros</Text>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleMateria(true)} >
            <Text style={styles.textMenu}>MATÉRIA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleAssunto(true)} >
            <Text style={styles.textMenu}>ASSUNTO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleEscolaridade(true)} >
            <Text style={styles.textMenu}>ESCOLARIDADE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleAno(true)} >
            <Text style={styles.textMenu}>ANO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleBanca(true)} >
            <Text style={styles.textMenu}>BANCA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleArea(true)} >
            <Text style={styles.textMenu}>ÁREA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleFormacao(true)} >
            <Text style={styles.textMenu}>FORMAÇÃO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleRegiao(true)} >
            <Text style={styles.textMenu}>REGIÃO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleOrgaoCargo(true)} >
            <Text style={styles.textMenu}>ÓRGÃO E CARGO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionMenu} onPress={() => setModalVisibleModalidade(true)} >
            <Text style={styles.textMenu}>MODALIDADES</Text>
          </TouchableOpacity>

        </View>

        <View style={{ width: '100%', height: '30%', }}>

          <View style={{ width: '100%', height: '75%', marginBottom: 2, marginTop: 2, flexDirection: 'row', justifyContent: 'space-between' }}>

            <ScrollView style={{ borderWidth: 1, borderColor: '#383e55', marginRight: '1%', marginLeft: '5%' }}>

              {renderMateria()}
              {renderAssuntos()}
              {renderEscolaridade()}
              {renderAno()}
              {renderBanca()}
              {renderArea()}
              {renderFormacao()}
              {renderRegiao()}
              {renderOrgaoCargo()}
              {renderModalidade()}

            </ScrollView>


            <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
              <TouchableOpacity style={{ width: '100%', height: '30%', backgroundColor: '#e6e4c1', borderRadius: 8, justifyContent: 'center' }} onPress={() => modalFiltros()} >
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', }}>Filtros salvos</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ width: '100%', height: '30%', backgroundColor: '#e6e4c1', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }} onPress={() => setModalVisibleSalvarFiltro(true)} >
                <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', }}>Salvar filtros</Text>
              </TouchableOpacity>
            </View>

          </View>



          <View style={{ width: '100%', height: '20%', flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity style={{ width: '95%', height: '100%', backgroundColor: '#e6e4c1', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }} onPress={() => handleResolverQuestoes()} >
              <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', }}>RESOLVER QUESTÕES</Text>
            </TouchableOpacity>

          </View>

        </View>

        {
          /*
          backgroundColor: '#FFF',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            borderRadius: 8,
            height: '7%',
            //height: 30,
            //bottom: 450,
            marginTop: 10
            //marginTop: 20,
        
        
          */
        }

      </View>

      <View style={styles.centeredView}>

        <Modal animationType="slide" transparent={true} visible={modalVisibleSalvarFiltro} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleSalvarFiltro(!modalVisibleSalvarFiltro);
        }} >
          <View style={{ marginTop: '60%' }}>
            <View style={styles.modalView}>
              <TextInput style={{ marginBottom: '15%', color: '#FFF', fontSize: 20 }}
                onChangeText={setmyInput}
                value={myInput}
                placeholder={placeholderSalvarFiltro}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '95%' }}>
                <Pressable
                  style={{
                    width: '45%', backgroundColor: "#2196F3", alignItems: 'center', justifyContent: 'center', borderRadius: 8, height: 40, bottom: 10,
                  }}
                  onPress={handleCancelarFiltro}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={{
                    width: '45%', backgroundColor: "#2196F3", alignItems: 'center',
                    justifyContent: 'center',

                    borderRadius: 8,
                    height: 40,
                    bottom: 10,
                  }}
                  onPress={handleSalvarFiltro}
                >
                  <Text style={styles.textStyle}>Salvar Filtro</Text>
                </Pressable>

              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleFiltroSalvo} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleFiltroSalvo(!modalVisibleFiltroSalvo);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Text style={{ fontSize: 13, width: '90%', color: '#FFF', justifyContent: 'center', alignItems: 'center' }}>Selecione o filtro para resolver as questões</Text>
              <View style={{ width: '100%', height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView horizontal={false}>
                  <ScrollView horizontal={true} >
                    <View style={{}}>
                      <FlatList
                        style={{
                          padding: 10,
                          margin: 5, /*width: '100%', marginTop: 10, backgroundColor: '#FFF', borderRadius: 8, width: '90%',*/
                        }}
                        data={filtrosSalvos}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                          return (

                            <TouchableOpacity style={{
                              alignItems: "center", backgroundColor: '#FFF',
                              //flexGrow: 1,
                              marginTop: 10,
                              padding: 10, borderRadius: 8, width: 200, justifyContent: 'center',/*marginTop: 10, height: '15%', backgroundColor: '#FFF', borderRadius: 8, width: '90%', alignItems: 'center', justifyContent: 'center', */
                            }} onPress={() => handleFiltroSelecionado(item.nomeFiltro)} >
                              <Text style={styles.textMenu} > {item.nomeFiltro}  </Text>

                            </TouchableOpacity>
                          );
                        }}
                      />

                    </View>
                  </ScrollView>

                </ScrollView>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'center', width: '95%' }}>
                <Pressable
                  style={{
                    width: '45%', backgroundColor: "#2196F3", alignItems: 'center',
                    justifyContent: 'center', borderRadius: 8, height: 40, top: '8%'
                  }}
                  onPress={handleCancelarFiltroSalvos}
                >
                  <Text style={styles.textStyle}>Cancelar</Text>
                </Pressable>

              </View>
            </View>
          </View>
        </Modal>
      </View>



      <View style={styles.centeredView}>

        <Modal animationType="slide" transparent={true} visible={modalVisibleMateria} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleMateria(!modalVisibleMateria);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={{}}>{renderFlatListMateria(disciplinas)}</Text>

                  </View>
                </ScrollView>

              </ScrollView>

              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleMateria(!modalVisibleMateria)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>

          </View>
        </Modal>
      </View>



      <View style={styles.centeredView}>

        <Modal animationType="slide" transparent={true} visible={modalVisibleAssunto} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleAssunto(!modalVisibleAssunto);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{renderFlatListAssunto(assuntos)}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleAssunto(!modalVisibleAssunto)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>



      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleEscolaridade} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleEscolaridade(!modalVisibleEscolaridade);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={styles.modalText}>{renderFlatListEscolaridade(escolaridades)}</Text>
                  </View>
                </ScrollView>
              </ScrollView>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleEscolaridade(!modalVisibleEscolaridade)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>


      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleAno} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleAno(!modalVisibleAno);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={styles.modalText}>{renderFlatListAno(anos)}</Text>
                  </View>
                </ScrollView>
              </ScrollView>
              <Text></Text>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleAno(!modalVisibleAno)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>


      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleBanca} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleBanca(!modalVisibleBanca);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={styles.modalText}>{renderFlatListBanca(bancas)}</Text>
                  </View>
                </ScrollView>
              </ScrollView>
              <Text></Text>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleBanca(!modalVisibleBanca)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>


      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleArea} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleArea(!modalVisibleArea);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={styles.modalText}>{renderFlatListArea(areas)}</Text>
                  </View>
                </ScrollView>
              </ScrollView>
              <Text></Text>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleArea(!modalVisibleArea)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>


      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleFormacao} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleFormacao(!modalVisibleFormacao);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={styles.modalText}>{renderFlatListFormacao(formacoes)}</Text>
                  </View>
                </ScrollView>
              </ScrollView>
              <Text></Text>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleFormacao(!modalVisibleFormacao)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>



      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleRegiao} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleRegiao(!modalVisibleRegiao);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={styles.modalText}>{renderFlatListRegiao(regioes)}</Text>
                  </View>
                </ScrollView>
              </ScrollView>
              <Text></Text>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleRegiao(!modalVisibleRegiao)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>



      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleOrgaoCargo} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleOrgaoCargo(!modalVisibleOrgaoCargo);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={styles.modalText}>{renderFlatListOrgaoCargo(orgaoCargos)}</Text>
                  </View>
                </ScrollView>
              </ScrollView>
              <Text></Text>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleOrgaoCargo(!modalVisibleOrgaoCargo)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>


      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisibleModalidade} onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisibleModalidade(!modalVisibleModalidade);
        }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScrollView horizontal={false}>
                <ScrollView horizontal={true} >
                  <View style={{}}>
                    <Text style={styles.modalText}>{renderFlatListModalidade(modalidades)}</Text>
                  </View>
                </ScrollView>
              </ScrollView>
              <Text></Text>
              <Pressable
                style={[styles.button, styles.buttonClose,]}
                onPress={() => setModalVisibleModalidade(!modalVisibleModalidade)}
              >
                <Text style={styles.textStyle}>APLICAR FILTRO</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242F',
  },
  corTextFiltro: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    height: '6%'
  },

  optionMenu: {
    backgroundColor: '#e6e4c1',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 8,
    height: '7%',
    marginTop: 10
  },

  textMenu: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    marginTop: 22
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e6e4c1'
  },

  button: {
    width: '95%'
  },

  buttonClose: {
    backgroundColor: "#2196F3",
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 8,
    height: 40,
    bottom: 15,
  },

  modalView: {
    margin: 10,
    backgroundColor: '#383e52',
    borderRadius: 20,
    padding: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },

  textStyle: {
    fontWeight: 'bold',
  }
});


const dataDisciplina = [
  { id: '1', txt: 'Português', isChecked: false },
  { id: '2', txt: 'Matemática', isChecked: false },
  { id: '3', txt: 'Português1', isChecked: false },
  { id: '4', txt: 'Matemática2', isChecked: false },
  { id: '5', txt: 'Português3', isChecked: false },
  { id: '6', txt: 'Matemática4', isChecked: false },
  { id: '7', txt: 'Português5', isChecked: false },
  { id: '8', txt: 'Matemática6', isChecked: false },
  { id: '9', txt: 'Matemática4', isChecked: false },
  { id: '10', txt: 'Português5', isChecked: false },
  { id: '11', txt: 'Matemática ultimo', isChecked: false },

];

const dataFiltroAssuntos = [
  { id: 1, disciplina: 'Português', assunto: 'Ortografia', isChecked: false },
  { id: 2, disciplina: 'Português', assunto: 'Morfologia', isChecked: false },
  { id: 3, disciplina: 'Português', assunto: 'Morfologia - Verbos', isChecked: false },
  { id: 4, disciplina: 'Matemática', assunto: 'MAT 1', isChecked: false },
  { id: 5, disciplina: 'Matemática', assunto: 'MAT 2', isChecked: false },
  { id: 6, disciplina: 'Matemática', assunto: 'MAT 3', isChecked: false },
];



const dataFiltroEscolaridade = [  // ----------->>> OK
  { id: '01', escolaridade: 'Doutorado', isChecked: false },
  { id: '02', escolaridade: 'Ensino Fundamental', isChecked: false },
  { id: '03', escolaridade: 'Ensino Médio', isChecked: false },
  { id: '04', escolaridade: 'Ensino Superior', isChecked: false },
  { id: '05', escolaridade: 'Especialização', isChecked: false },
  { id: '06', escolaridade: 'Mestrado', isChecked: false },
];

const dataFiltroAno = [   // ------------------->>> OK
  { id: '2021', ano: '2021', isChecked: false },
  { id: '2020', ano: '2020', isChecked: false },
  { id: '2019', ano: '2019', isChecked: false },
  { id: '2018', ano: '2018', isChecked: false },
  { id: '2017', ano: '2017', isChecked: false },
  { id: '2016', ano: '2016', isChecked: false },
  { id: '2015', ano: '2015', isChecked: false },
  { id: '2014', ano: '2014', isChecked: false },
  { id: '2013', ano: '2013', isChecked: false },
  { id: '2012', ano: '2012', isChecked: false },
  { id: '2011', ano: '2011', isChecked: false },
  { id: '2010', ano: '2010', isChecked: false },
  { id: '2009', ano: '2009', isChecked: false },
  { id: '2008', ano: '2008', isChecked: false },
  { id: '2007', ano: '2007', isChecked: false },
  { id: '2006', ano: '2006', isChecked: false },
  { id: '2005', ano: '2005', isChecked: false },
];

const dataFiltroBanca = [
  { id: '1', banca: 'Op BANCA 1', isChecked: false },
  { id: '2', banca: 'Op BANCA 2', isChecked: false },
  { id: '3', banca: 'Op BANCA 3', isChecked: false },
];

const dataFiltroArea = [ //-------------->>> OK
  { id: '1', area: 'Agência Reguladoras', isChecked: false },
  { id: '2', area: 'Bancária e Financeira', isChecked: false },
  { id: '3', area: 'Conselho de Fiscalização', isChecked: false },
  { id: '4', area: 'Diplomacia e Comércio Exterior', isChecked: false },
  { id: '5', area: 'EDUCAÇÃO - Professores', isChecked: false },
  { id: '6', area: 'EDUCAÇÃO - Servidor Administrativo', isChecked: false },
  { id: '7', area: 'EP e SEM', isChecked: false },
  { id: '8', area: 'Estágio', isChecked: false },
  { id: '9', area: 'EXAME - OAB', isChecked: false },
  { id: '10', area: 'EXAME - CFC e Certificações Contábeis', isChecked: false },
  { id: '11', area: 'Executivo Geral', isChecked: false },
  { id: '12', area: 'Fiscal', isChecked: false },
  { id: '13', area: 'Forças Armadas - Oficiais', isChecked: false },
  { id: '14', area: 'Forças Armadas - Praças', isChecked: false },
  { id: '15', area: 'Gestão e Controle - Controladorias', isChecked: false },
  { id: '16', area: 'Gestão e Controle - Tribunal de Contas', isChecked: false },
  { id: '17', area: 'Gestão e Controle - Gestão Governamental', isChecked: false },
  { id: '18', area: 'JUDICIÁRIA - (TRFs, STF E STJ', isChecked: false },
  { id: '19', area: 'JUDICIÁRIA - (TRTs E TST', isChecked: false },
  { id: '20', area: 'JUDICIÁRIA - (TREs E TSE', isChecked: false },
  { id: '21', area: 'JUDICIÁRIA - (TJs)', isChecked: false },
  { id: '22', area: 'JUDICIÁRIA - (TJMs E STM)', isChecked: false },
  { id: '23', area: 'JUDICIÁRIA - (MPS)', isChecked: false },
  { id: '24', area: 'JUDICIÁRIA - (Defensoria)', isChecked: false },
  { id: '25', area: 'JUDICIÁRIA - (AGU, PGEs e PGMs)', isChecked: false },
  { id: '26', area: 'JUDICIÁRIA - (CNMP e CNJ', isChecked: false },
  { id: '27', area: 'JURÍFICA - Magistratura Federal', isChecked: false },
  { id: '28', area: 'JURÍFICA - Magistratura do Trabalho', isChecked: false },
  { id: '29', area: 'JURÍFICA - Magistratura Estadual', isChecked: false },
  { id: '30', area: 'JURÍFICA - Magistratura Militar', isChecked: false },
  { id: '31', area: 'JURÍFICA - Promotoria', isChecked: false },
  { id: '32', area: 'JURÍFICA - Defensoria', isChecked: false },
  { id: '33', area: 'JURÍFICA - Procuradoria', isChecked: false },
  { id: '34', area: 'JURÍFICA - Cartório', isChecked: false },
  { id: '35', area: 'Legislativo', isChecked: false },
  { id: '36', area: 'POLICIAL - Delegados', isChecked: false },
  { id: '37', area: 'POLICIAL - Peritos, Papiloscopistas e Auxiliares', isChecked: false },
  { id: '38', area: 'POLICIAL - Agentes, Escrivães e Investigadores', isChecked: false },
  { id: '39', area: 'POLICIAL - Guardas Civis', isChecked: false },
  { id: '40', area: 'POLICIAL - Penitenciária', isChecked: false },
  { id: '41', area: 'POLICIAL - Suporte Administrativo Policial', isChecked: false },
  { id: '42', area: 'Previdenciária', isChecked: false },
  { id: '43', area: 'Saúde', isChecked: false },
  { id: '44', area: 'Vestibular', isChecked: false },
];

const dataFiltroFormacao = [  // FALTA FINALIZAR
  { id: '1', formacao: 'Administração', isChecked: false },
  { id: '2', formacao: 'Administração Pública', isChecked: false },
  { id: '3', formacao: 'Agronomia (Engenharia Agronômica)', isChecked: false },
  { id: '4', formacao: 'Antropologia', isChecked: false },
  { id: '5', formacao: 'Arqueologia', isChecked: false },
  { id: '6', formacao: 'Arquitetura', isChecked: false },
  { id: '7', formacao: 'Arquivologia', isChecked: false },
  { id: '8', formacao: 'Artes Cênicas', isChecked: false },
  { id: '9', formacao: 'Artes Visuais', isChecked: false },
  { id: '10', formacao: 'Astronomia', isChecked: false },
  { id: '11', formacao: 'Audiovisual', isChecked: false },
  { id: '12', formacao: 'Biblioteconomia', isChecked: false },
  { id: '13', formacao: 'Biologia (Ciências Biológicas)', isChecked: false },
  { id: '14', formacao: 'Biomedicina', isChecked: false },
  { id: '15', formacao: 'Bioquímica', isChecked: false },
  { id: '16', formacao: 'Biotecnologia', isChecked: false },
  { id: '17', formacao: 'Ciência da Informação', isChecked: false },
  { id: '18', formacao: 'Ciências Aeronáuticas', isChecked: false },
  { id: '19', formacao: 'Ciências Atuariais', isChecked: false },
  { id: '20', formacao: 'Ciências da Natureza', isChecked: false },
  { id: '21', formacao: 'Ciências Naúticas ou Ciêcias Navais', isChecked: false },
  { id: '22', formacao: 'Ciências Políticas', isChecked: false },
  { id: '23', formacao: 'Ciências Sociais', isChecked: false },
  { id: '24', formacao: 'Cinema', isChecked: false },
  { id: '25', formacao: 'Comunicação Social - Jornalismo', isChecked: false },
  { id: '26', formacao: 'Comunicação Social - Publicidade e Propaganda', isChecked: false },
  { id: '27', formacao: 'Comunicação Social - Rádio e TV', isChecked: false },
  { id: '28', formacao: 'Comunicação Social - Relações Públicas', isChecked: false },
  { id: '29', formacao: 'Contabilidade (Ciências Contábeis', isChecked: false },
  { id: '30', formacao: 'Dança', isChecked: false },
  { id: '31', formacao: 'Desenho Industrial', isChecked: false },
  { id: '32', formacao: 'Design', isChecked: false },
  { id: '33', formacao: 'Direito', isChecked: false },
  { id: '34', formacao: 'Ecologia', isChecked: false },
  { id: '35', formacao: 'Economia (Ciêncis Econômicas)', isChecked: false },
  { id: '36', formacao: 'Educação Artística', isChecked: false },
  { id: '37', formacao: 'Educação Física', isChecked: false },
  { id: '38', formacao: 'Enfermagem', isChecked: false },
  { id: '39', formacao: 'Engenharia Aeronáutica', isChecked: false },
  { id: '40', formacao: 'Engenharia Agronômica', isChecked: false },
  { id: '41', formacao: 'Engenharia Ambiental', isChecked: false },
  { id: '42', formacao: 'Engenharia Biomédica', isChecked: false },
  { id: '43', formacao: 'Engenharia Cartográfia', isChecked: false },
  { id: '44', formacao: 'Engenharia Civil', isChecked: false },
  { id: '45', formacao: 'Engenharia da Computação', isChecked: false },
  { id: '46', formacao: 'Engenharia de Alimentos', isChecked: false },
  { id: '47', formacao: 'Engenharia de Automação e Controle', isChecked: false },
  { id: '48', formacao: 'Engenharia de Bioprocessos e Biotecnologia', isChecked: false },
  { id: '49', formacao: 'Engenharia de Materiais', isChecked: false },
  { id: '50', formacao: 'Engenharia de Minas', isChecked: false },
  { id: '51', formacao: 'Engenharia de Pesca', isChecked: false },
  { id: '52', formacao: 'Engenharia de Petróleo', isChecked: false },
  { id: '53', formacao: 'Engenharia ', isChecked: false },
  { id: '54', formacao: 'Engenharia', isChecked: false },
  { id: '55', formacao: 'Engenharia', isChecked: false },
  { id: '56', formacao: 'Engenharia', isChecked: false },
  { id: '57', formacao: 'Engenharia', isChecked: false },
  { id: '58', formacao: 'Engenharia', isChecked: false },
  { id: '59', formacao: 'Engenharia', isChecked: false },
  { id: '60', formacao: 'Engenharia', isChecked: false },
  { id: '61', formacao: 'Engenharia', isChecked: false },
];

const dataFiltroRegiao = [
  { id: '1', regiao: 'Op Regiao 1', isChecked: false },
  { id: '2', regiao: 'Op Regiao 2', isChecked: false },
  { id: '3', regiao: 'Op Regiao 3', isChecked: false },
];

const dataFiltroOrgaoCargo = [
  { id: '1', orgaoCargo: 'Op OrgaoCargo 1', isChecked: false },
  { id: '2', orgaoCargo: 'Op OrgaoCargo 2', isChecked: false },
  { id: '3', orgaoCargo: 'Op OrgaoCargo 3', isChecked: false },
];

const dataFiltroModalidades = [
  { id: '1', modalidade: 'Op modalidades 1', isChecked: false },
  { id: '2', modalidade: 'Op modalidades 2', isChecked: false },
  { id: '3', modalidade: 'Op modalidades 3', isChecked: false },
];