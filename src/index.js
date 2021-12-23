import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css';

const ui = SwaggerUI({
    url: "https://petstore.swagger.io/v2/swagger.json",
    dom_id: '#swagger',
});
