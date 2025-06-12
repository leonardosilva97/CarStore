import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';

interface FormTextInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  name: FieldPath<T>;
  control: Control<T>;
  placeholder?: string;
  icon?: keyof typeof Feather.glyphMap;
  secureTextEntry?: boolean;
}

export function FormTextInput<T extends FieldValues>({
  name,
  control,
  placeholder,
  icon,
  secureTextEntry = false,
  ...textInputProps
}: FormTextInputProps<T>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="mb-4">
          <View className={`relative ${error ? 'mb-1' : ''}`}>
            
            {icon && (
              <View className="absolute left-4 top-4 z-10">
                <Feather name={icon} size={20} color={error ? '#EF4444' : '#9CA3AF'} />
              </View>
            )}
            
        
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry && !isPasswordVisible}
              className={`
                bg-gray-50 
                border 
                ${error ? 'border-red-500' : 'border-gray-200'} 
                rounded-xl 
                ${icon ? 'px-12' : 'px-4'} 
                ${secureTextEntry ? 'pr-12' : ''} 
                py-4 
                text-gray-900 
                text-base
                shadow-sm
              `}
              {...textInputProps}
            />
            
          
            {secureTextEntry && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                className="absolute right-4 top-4 z-10"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Feather
                  name={isPasswordVisible ? 'eye' : 'eye-off'}
                  size={20}
                  color={error ? '#EF4444' : '#9CA3AF'}
                />
              </TouchableOpacity>
            )}
          </View>
          
        
          {error && (
            <Text className="text-red-500 text-sm mt-1 ml-1">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
