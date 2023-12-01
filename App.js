import React, { useState } from 'react';
import {
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);



const BotaoCalculadora = ({ valor, onPress, estilo = {} }) => (
  <AnimatedTouchableOpacity
    style={[
      styles.botao,
      valor === '⌫' && styles.botaoApagar,
      estilo,
    ]}
    onPress={onPress}
  >
    <Text style={styles.textoBotao}>{valor}</Text>
  </AnimatedTouchableOpacity>
);

const App = () => {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState('');
  const [expressaoCompleta, setExpressaoCompleta] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const animacaoBotaoPressionado = new Animated.Value(1);

  const lidarComPressao = (valor) => {
    try {
      if (valor === '=') {
        const expressao = entrada.replace(/[^-()\d/*+.]/g, '');
        const resultadoCalculo = eval(expressao);

        if (isNaN(resultadoCalculo) || !isFinite(resultadoCalculo)) {
          setResultado('Erro');
        } else {
          setResultado(resultadoCalculo.toString());
        }

        setExpressaoCompleta('');
      } else if (valor === 'C') {
        setEntrada('');
        setResultado('');
        setExpressaoCompleta('');
      } else if (valor === '⌫') {
        setEntrada((entradaAnterior) => entradaAnterior.slice(0, -1));
        setExpressaoCompleta((exprAnterior) => exprAnterior.slice(0, -1));
      } else {
        if (entrada.length + valor.length <= 38) {
          setEntrada((entradaAnterior) => entradaAnterior + valor);
          setExpressaoCompleta((exprAnterior) => exprAnterior + valor);
        } else {
          setErrorMessage('Maximum character limit reached');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      }
    } catch (error) {
      setResultado('Erro');
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
    <BotaoCalculadora
      key={valor}
      valor={valor}
      onPress={() => {
        lidarComPressao(valor);
        pressionarBotao();
      }}
      estilo={estilo}
    />
  );

  const botoes = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C', '⌫'],
  ];

  return (
    <ImageBackground source={require('./lib/raju.jpg')} style={styles.fundo}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>Affectionate digits💘</Text>
        </View>
        <View style={styles.containerResultado}>
          <Text style={styles.textoEntrada}>{expressaoCompleta}</Text>
          <Text style={styles.textoResultado}>{resultado}</Text>
          {errorMessage !== '' && (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
        </View>
        <View style={styles.containerBotoes}>
          {botoes.map((linha, indiceLinha) => (
            <View key={indiceLinha} style={styles.linha}>
              {linha.map((botao) => renderizarBotao(botao))}
            </View>
          ))}
        </View>
        <View style={styles.navbar}>
          <Text style={styles.navbarTexto}>Criado por: @Devsntosx71</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    resizeMode: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  tituloContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    margin: 50,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  containerResultado: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(255, 182, 193, 0.8)',
    borderRadius: 7,
    borderWidth: 3,
    borderColor: '#ccc',
    marginHorizontal: 30,
    marginBottom: 0,
  },
  textoEntrada: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'right',
  },
  textoResultado: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
  },
  containerBotoes: {
    flex: 3,
    marginHorizontal: 28,
  },
  linha: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  botao: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 15,
    margin: 2,
    padding: 20,
    backgroundColor: 'rgba(255, 182, 193, 0.8)',
  },
  botaoApagar: {
    backgroundColor: 'rgba(255, 0, 0, 0.8)',
  },
  textoBotao: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
  navbar: {
    backgroundColor: 'rgba(255, 182, 193, 0.8)',
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    bottom: 0,
    left: 0,
    right: 0,
  },
  navbarTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default App;
