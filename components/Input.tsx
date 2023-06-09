import React from 'react';
import { View, ViewProps } from "react-native";
import { Controller, ControllerProps, FieldPathByValue, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { getDeepVal } from '../utils/form';
import { FormContext } from '../hooks/FormContext';
import { storage } from '../clients/mmkv';

type InputP =
  Omit<ControllerProps<FormContext>, 'render' | 'name'> &
  TextInputProps & {
    containerStyle?: ViewProps['style'];
    name: FieldPathByValue<FormContext, string>;
    MMKVKey?: FieldPathByValue<FormContext, string> | string;
    required?: boolean;
  };

export default function Input({
  containerStyle,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  MMKVKey,
  required,
  ...rest
}: InputP) {
  const { control, formState } = useFormContext<FormContext>();
  const error = getDeepVal(formState.errors, name);

  return (
    <View style={containerStyle}>
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules as any,
          required: required ? {value: true, message: 'Esse campo é obrigatório'} : rules?.required,
        }}
        defaultValue={defaultValue}
        shouldUnregister={shouldUnregister}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={text => {
              if (MMKVKey) {
                storage.set(MMKVKey, text);
              }
              onChange(text);
            }}
            value={value as string}
            mode='outlined'
            {...rest}
          />
        )}
      />
      <HelperText visible={!!error} type='error'>{error?.message}</HelperText>
    </View>
  );
}


//style={!error ? {margin: -12, zIndex: -1} : undefined}