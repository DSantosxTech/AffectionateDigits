import React, { useState } from 'react';
import {
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const { height, width } = Dimensions.get('window');

export default function App() {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState('');

  const animacaoBotaoPressionado = new Animated.Value(1);

  const lidarComPressao = (valor) => {
    if (valor === '=') {
      try {
        setResultado(eval(entrada).toString());
      } catch (error) {
        setResultado('Erro');
      }
    } else if (valor === 'C') {
      setEntrada('');
      setResultado('');
    } else {
      setEntrada((entradaAnterior) => entradaAnterior + valor);
    }
  };

  const pressionarBotao = () => {
    Animated.sequence([
      Animated.timing(animacaoBotaoPressionado, {
        toValue: 0.8,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animacaoBotaoPressionado, {
        toValue: 1,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderizarBotao = (valor, estilo = {}) => (
    <AnimatedTouchableOpacity
      key={valor}
      style={[
        styles.botao,
        estilo,
        {
          transform: [{ scale: animacaoBotaoPressionado }],
        },
      ]}
      onPress={() => {
        lidarComPressao(valor);
        pressionarBotao();
      }}
    >
      <Text style={styles.textoBotao}>{valor}</Text>
    </AnimatedTouchableOpacity>
  );

  const botoes = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C'],
  ];

  return (
    <ImageBackground
      source={require('./lib/raju.jpg')}
      style={styles.fundo}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>Calculadora do meu Amor💘</Text>
        </View>
        <View style={styles.containerResultado}>
          <Text style={styles.textoEntrada}>{entrada}</Text>
          <Text style={styles.textoResultado}>{resultado}</Text>
        </View>
        <View style={styles.containerBotoes}>
          {botoes.map((linha, indiceLinha) => (
            <View key={indiceLinha} style={styles.linha}>
              {linha.map((botao) => renderizarBotao(botao))}
            </View>
          ))}
        </View>
        <Text style={styles.titulo}>Create by: @Devsntosx71</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  tituloContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: height * 0.1,
    margin: width * 0.1,
  },
  titulo: {
    fontSize: width * 0.05,
    color: 'black',
    textAlign: 'center',
  },
  containerResultado: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: width * 0.05,
    backgroundColor: 'rgba(255, 182, 193, 0.8)',
    borderRadius: width * 0.02,
    marginHorizontal: width * 0.1,
    marginBottom: width * 0.1,
  },
  textoEntrada: {
    fontSize: width * 0.09,
    color: '#fff',
    textAlign: 'right',
  },
  textoResultado: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  containerBotoes: {
    flex: 3,
    marginHorizontal: width * 0.1,
  },
  linha: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  botao: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    
    borderRadius: width * 0.05,
    margin: width * 0.01, // Reduzi a margem
    padding: width * 0.04, // Aumentei o padding
    backgroundColor: 'rgba(255, 105, 180, 0.7)',
  },
  textoBotao: {
    fontSize: width * 0.10,
    color: '#fff',
  },
});
