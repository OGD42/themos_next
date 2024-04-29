import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import cities from "../_data/cities";

export default function GuidedChat() {
  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      <Input
        type="string"
        label="Nombre"
        placeholder="Escribe tu nombre"
        className="my-2"
      />
      <Autocomplete id="country" label="De que país?" className="my-2">
        {cities.map((i, key) => (
          <AutocompleteItem key={i.label}>{i.label}</AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        id="educationalLevel"
        label="Nivel Educativo"
        className="my-2"
      >
        <AutocompleteItem key="primaria">Primaria</AutocompleteItem>
        <AutocompleteItem key="secundaria">Secundaria</AutocompleteItem>
        <AutocompleteItem key="preparatoria">
          Preparatoria/Bachillerato
        </AutocompleteItem>
        <AutocompleteItem key="universidad">Universidad</AutocompleteItem>
      </Autocomplete>
      <Textarea className="my-2" label="Por que te gustaría migrar a España?" />
      <Button variant="solid" color="primary" className="my-2">
        Generar Consulta a Themos
      </Button>
    </div>
  );
}
