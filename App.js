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

const App = () => {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState('');
  const [expressaoCompleta, setExpressaoCompleta] = useState('');
  const animacaoBotaoPressionado = new Animated.Value(1);

  const lidarComPressao = (valor) => {
    if (valor === '=') {
      try {
        const expressao = entrada.replace(/[^-()\d/*+.]/g, '');
        setResultado(eval(expressao).toString());
        setExpressaoCompleta('');
      } catch (error) {
        setResultado('Erro');
      }
    } else if (valor === 'C') {
      setEntrada('');
      setResultado('');
      setExpressaoCompleta('');
    } else {
      setEntrada((entradaAnterior) => entradaAnterior + valor);
      setExpressaoCompleta((exprAnterior) => exprAnterior + valor);
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
          <Text style={styles.titulo}>Affectionate digits💘</Text>
        </View>
        <View style={styles.containerResultado}>
          <Text style={styles.textoEntrada}>{expressaoCompleta}</Text>
          <Text style={styles.textoResultado}>{resultado}</Text>
        </View>
        <View style={styles.containerBotoes}>
          {botoes.map((linha, indiceLinha) => (
            <View key={indiceLinha} style={styles.linha}>
              {linha.map((botao) => renderizarBotao(botao))}
            </View>
          ))}
        </View>
        <View style={styles.navbar}>
          <Text style={styles.navbarTexto}>Create by: @Devsntosx71</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

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
    margin: width * 0.01,
    padding: width * 0.04,
    backgroundColor: 'rgba(255, 105, 180, 0.7)',
  },
  textoBotao: {
    justifyContent: 'center',
    alignItems:'center',
    fontSize: width * 0.10,
    color: '#fff',
  },
  navbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    alignItems: 'center',
    marginTop:20,
    bottom: 0,
    left: 0,
    right: 0,
  },
  navbarTexto: {
    fontSize: width * 0.05,
    color: '#fff',
  },
});

export default App;
