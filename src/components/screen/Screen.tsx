import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import { useAppSafeArea } from '~/hooks/useAppSafeArea';
import { ScrollViewContainer, ViewContainer } from './components/ScreenContainer';
import { ScreenHeader } from './components/ScreenHeader';

export interface ScreenProps {
  children: React.ReactNode;
  canGoBack?: boolean;
  scrollable?: boolean;
  title?: string;
  style?: object;
}

export function Screen({
  children,
  canGoBack = false,
  scrollable = false,
  style,
  title,
}: ScreenProps) {
  const { top, bottom } = useAppSafeArea();
  const Container = scrollable ? ScrollViewContainer : ViewContainer;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1">
      <Container backgroundColor={'#FFF'}>
        <View
          className={'px-6 flex-1'}
          style={[{ paddingTop: top, paddingBottom: bottom }, style]}>
          {canGoBack && <ScreenHeader canGoBack={canGoBack} title={title} />}
          {children}
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
