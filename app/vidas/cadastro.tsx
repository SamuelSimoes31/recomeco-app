import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormContext } from "react-hook-form";
import Input from '../../components/Input';
import { Button } from 'react-native-paper';
import RadioGroup from '../../components/RadioGroup';
import { FormContext } from '../../hooks/FormContext';

export default function cadastro() {
  const { handleSubmit } = useFormContext<FormContext>();
  const onSubmit = (data: any) => console.log(data);

  return (
    <View style={styles.container}>
      <Input
        name='vida.nome'
        label={'NOME COMPLETO'}
        placeholder='insira um valor'
        rules={{
          required: {value: true, message: 'Esse campo é obrigatório'}
        }}
      />
      <Input
        name='vida.idade'
        label={'Idade'}
        keyboardType='number-pad'
      />
      <RadioGroup
        name='vida.sexo'
        label='SEXO'
        options={['MASCULINO', 'FEMININO']}
      />
      <RadioGroup
        name='vida.estadoCivil'
        label='ESTADO CIVIL'
        options={['CASADO(A)', 'SOLTEIRO(A)', 'VIÚVO(A)']}
      />
      <Input
        name='vida.telefone1'
        label={'Telefone 1'}
      />
      <Input
        name='vida.telefone2'
        label={'Telefone 2'}
      />
      <Button mode='contained' onPress={handleSubmit(onSubmit)} >Submit</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  main: {
    flex: 1,
    justifyContent: "space-between",
    alignContent: 'center',
    width: '100%',
    maxHeight: '60%',
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
