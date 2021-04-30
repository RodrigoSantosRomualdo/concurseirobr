import React from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.img} source={require('../../assets/logo.png')} />

      <View style={styles.opcaoText}>
        <Text style={styles.textoBoasVindas1}>Olá, Rodrigo!</Text>
        <Text style={styles.textoBoasVindas2}>Selecione o seu objetivo hoje?</Text>

      </View>

      <TouchableOpacity style={styles.optionMenu} onPress={() => navigation.navigate('Concurso')}>
        <Text style={styles.textMenu}>Questões de Concurso</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionMenu} onPress={() => navigation.navigate('StatusConcursos')}>
        <Text style={styles.textMenu}>Status dos Concursos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionMenu} onPress={() => navigation.navigate('Emprego')} >
        <Text style={styles.textMenu}>Vagas de Empregos</Text>
      </TouchableOpacity>

    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0
  },
  textoBoasVindas1: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10
  },
  textoBoasVindas2: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  opcaoText: {
    marginBottom: 10
  },
  text: {
    color: '#FFF'
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: 90,
    left: 0,
    top: 0,
    //backgroundColor: '#FFF'
  },
  optionMenu: {
    backgroundColor: '#e6e4c1',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    borderRadius: 8,
    height: 50,
    marginTop: 20,


  },
  textMenu: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewMenu: {
    marginTop: 90,
    width: '100%'

  }
})