import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useAnimatedGestureHandler,
  withSpring,
  interpolate,
  useDerivedValue,
  spring,
} from "react-native-reanimated";
import { View, Button, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { PanModal } from "./PanModal";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const MARGIN = screenWidth * 0.15;
const PAN_WIDTH = screenWidth - MARGIN * 2;
const PAN_HEIGHT = screenHeight - MARGIN * 2;

const COUNT = 5;

const springActionConfig = {
  damping: 20,
  stiffness: 300,
  mass: 1,
  overshootClamping: false,
};

export default AnimatedStyleUpdateExample = (props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const borderRadius = useSharedValue(20);

  const translateX1 = useDerivedValue(() => {
    return withSpring(translateX.value, springActionConfig);
  }, []);

  const translateY1 = useDerivedValue(() => {
    return withSpring(translateY.value, springActionConfig);
  }, []);

  const scale1 = useDerivedValue(() => {
    return withSpring(scale.value, springActionConfig);
  }, []);

  const borderRadius1 = useDerivedValue(() => {
    return withSpring(borderRadius.value, springActionConfig);
  }, []);

  const translateX2 = useDerivedValue(() => {
    return withSpring(translateX1.value, springActionConfig);
  }, []);

  const translateY2 = useDerivedValue(() => {
    return withSpring(translateY1.value, springActionConfig);
  }, []);

  const scale2 = useDerivedValue(() => {
    return withSpring(scale1.value, springActionConfig);
  }, []);

  const borderRadius2 = useDerivedValue(() => {
    return withSpring(borderRadius1.value, springActionConfig);
  }, []);


  const translateX3 = useDerivedValue(() => {
    return withSpring(translateX2.value, springActionConfig);
  }, []);

  const translateY3 = useDerivedValue(() => {
    return withSpring(translateY2.value, springActionConfig);
  }, []);

  const scale3 = useDerivedValue(() => {
    return withSpring(scale2.value, springActionConfig);
  }, []);

  const borderRadius3 = useDerivedValue(() => {
    return withSpring(borderRadius2.value, springActionConfig);
  }, []);


  const translateX4 = useDerivedValue(() => {
    return withSpring(translateX3.value, springActionConfig);
  }, []);

  const translateY4 = useDerivedValue(() => {
    return withSpring(translateY3.value, springActionConfig);
  }, []);

  const scale4 = useDerivedValue(() => {
    return withSpring(scale3.value, springActionConfig);
  }, []);

  const borderRadius4 = useDerivedValue(() => {
    return withSpring(borderRadius3.value, springActionConfig);
  }, []);


  return (
    <View style={styles.container}>
      <PanModal
        translateX={translateX4}
        translateY={translateY4}
        scale={scale4}
        borderRadius={borderRadius4}
        color={"rgba(255,0,191,0.8)"}
      />
      <PanModal
        translateX={translateX3}
        translateY={translateY3}
        scale={scale3}
        borderRadius={borderRadius3}
        color={"rgba(0,255,100,0.8)"}
      />
      <PanModal
        translateX={translateX2}
        translateY={translateY2}
        scale={scale2}
        borderRadius={borderRadius2}
        color={"rgba(255,181,0,0.8)"}
      />
      <PanModal
        translateX={translateX1}
        translateY={translateY1}
        scale={scale1}
        borderRadius={borderRadius1}
        color={"rgba(127,255,0,0.8)"}
      />
      <PanModal
        color={"rgba(0,247,255,0.8)"}
        colorMask={"rgba(0,247,255,1)"}
        scale={scale}
        translateX={translateX}
        translateY={translateY}
        borderRadius={borderRadius}
        leading={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
