import styled from 'styled-components/native'

export const Container = styled.View`
flex: 1
flexDirection: 'column'
alignItems: 'center'
// coral color
backgroundColor: '#ff750'
// dark salmon color
// color: '#e9967a'
`

export const Scroll = styled.ScrollView`
flex: 0.5
flexDirection: 'column'
alignItems: 'center'
borderWidth: 5
// misty rose color
backgroundColor: '#ffe4e1'
`

export const InputText = styled.TextInput`
fontSize: 12
fontStyle: 'normal'
`

export const PrimaryButton = styled.TouchableOpacity`
backgroundColor: "#009688"
borderRadius: 10
paddingVertical: 10
paddingHorizontal: 12
`

export const PrimaryText = styled.Text`
fontSize: 12
fontStyle: 'normal'
`

export const Title = styled.Text`
fontSize: 12
fontStyle: 'normal'
fontWeight: 'bold'
`

export const Pick = styled.Picker`
flex: 0.2
alignItems: 'center'
borderWidth: 5
// misty rose color
backgroundColor: '#ffe4e1'
`
