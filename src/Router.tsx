import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { VIEW_NAME } from "./constants";
import { OnBoarding } from "./views/onBoarding";
import { Home } from "./views/home";
import { Main } from "./views/main";
import { NavigationContainer } from "@react-navigation/native";
import { GlobalLayout } from "./components/GlobalLayout";
import { SignIn } from "./views/signIn";
import { SignUp } from "./views/signUp";

const Stack = createNativeStackNavigator();

interface RouterProps {
  initialRouterName: VIEW_NAME;
}

export function Router({ initialRouterName }: RouterProps) {
  return (
    <GlobalLayout>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouterName}>
          <Stack.Screen
            name={VIEW_NAME.ON_BOARDING}
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={VIEW_NAME.HOME}
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={VIEW_NAME.MAIN} component={Main} />
          <Stack.Screen name={VIEW_NAME.SIGN_IN} component={SignIn} />
          <Stack.Screen
            name={VIEW_NAME.SIGN_UP}
            component={SignUp}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalLayout>
  );
}
