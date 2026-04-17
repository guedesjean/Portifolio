class Project {
    constructor(title, description, tech, image) {
        this.title = title;
        this.description = description;
        this.tech = tech;
        this.image = image;
    }

    render() {
        return `
            <div class="project-card">
                <img src="${this.image}" width="100%">
                <h3>${this.title}</h3>
                <p>${this.description}</p>
                <span>${this.tech}</span>
            </div>
        `;
    }
}

const projects = [
    new Project("Dashboard SLA", "Monitoramento em tempo real", "Power BI", ""),
    new Project("Automação VBA", "Integração com SQL Server", "VBA", ""),
    new Project("App Caminhões", "Controle logístico", "Power Apps", "")
];