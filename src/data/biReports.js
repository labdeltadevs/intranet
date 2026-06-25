// Reports list
const reports = [
  {
    id: 'ag1',
    title: 'Gerencia General',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiZTBlYTQwMGQtZDAxNi00MTk3LTkwOWEtYmY5NTIxNmVhNTllIiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'gerencia123',
  },
  {
    id: 'ag2',
    title: 'Gerencia Administrativa Financiera',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiZTBlYTQwMGQtZDAxNi00MTk3LTkwOWEtYmY5NTIxNmVhNTllIiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'gerencia123',
  },
  {
    id: 'ag3',
    title: 'Gerencia Comercial',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiZGYwZDI2YWYtNzM1Mi00NTBmLTk1YjktMjJiZDEyMjhhN2M1IiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'comercial123',
  },
  {
    id: 'ag4',
    title: 'Gerencia de Marketing',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiZGYwZDI2YWYtNzM1Mi00NTBmLTk1YjktMjJiZDEyMjhhN2M1IiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'comercial123',
  },
  {
    id: 'ac1',
    title: 'Zona 1',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiYmNhYzMxNGMtZDIwNy00NWQzLWI4OTItMmVjZDBmN2E0MGEyIiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'comercial1123',
  },
  {
    id: 'ac2',
    title: 'Zona 2',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiNTAwNzI0ZjEtMmRlNS00ZGUwLWE2NDUtYzkyZGFkYTRlYjg0IiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'comercial1223',
  },
  {
    id: 'ac3',
    title: 'Zona 3',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiZGI3OWYzM2ItZThhZS00NDlhLWIyNjQtYzA5ZTFjMTcxNTIxIiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'comercial1233',
  },
  {
    id: 'ac4',
    title: 'Zona 4',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiZGQwM2JkZTYtNmVhZS00YWVhLWJjNTctMjEzZWEyNDU2YzYzIiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'comercial1234',
  },
  {
    id: 'rh1',
    title: 'Recursos Humanos',
    src: 'https://app.powerbi.com/view?r=eyJrIjoiZGQwM2JkZTYtNmVhZS00YWVhLWJjNTctMjEzZWEyNDU2YzYzIiwidCI6ImRiZTE3OTkxLTNmOTItNGYzNi04YjQ3LTIxZjE2MTc3Y2RlZiIsImMiOjR9',
    pin: 'comercial1234',
  },
]

// inputOptions for SweetAlert2, matching the required format
const inputOptions = {
  'Alta Gerencia': {
    ag1: 'Gerencia General',
    ag2: 'Gerencia Administrativa Financiera',
    ag3: 'Gerencia Comercial',
    ag4: 'Gerencia de Marketing',
  },
  'Area Comercial': {
    ac1: 'Gerencia La Paz',
    ac2: 'Gerencia Cochabamba',
    ac3: 'Gerencia Santa Cruz',
    ac4: 'Gerencia Chuquisaca',
  },
  'Recursos Humanos': {
    rh1: 'Recursos Humanos',
  },
}

export default { reports, inputOptions }
