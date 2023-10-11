import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { VIEW_NAME } from "./constants";
import { OnBoarding } from "./views/onBoarding";
import { Home } from "./views/home";
import { Main } from "./views/main";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

type RouterProps = {
  initialRouterName: VIEW_NAME;
};

export function Router({ initialRouterName }: RouterProps) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouterName}>
        <Stack.Screen name={VIEW_NAME.ON_BOARDING} component={OnBoarding} />
        <Stack.Screen name={VIEW_NAME.HOME} component={Home} />
        <Stack.Screen name={VIEW_NAME.MAIN} component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
