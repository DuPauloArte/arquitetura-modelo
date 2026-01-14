import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ArrowLeft, Instagram, Linkedin, Mail, ChevronDown, MoveRight, MapPin, Phone } from 'lucide-react';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  // Efeito de scroll para a navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCloseProject = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedProject(null);
      setIsClosing(false);
    }, 500); // Tempo da animação de saída
  };

  // Dados Mockados Expandidos
  const projects = [
    {
      id: 1,
      title: "Residência Horizon",
      location: "Alphaville, SP",
      category: "Residencial",
      year: "2023",
      area: "450m²",
      image: "https://images.unsplash.com/photo-1646936190308-6faef1ac893c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      desc: "Minimalismo concreto em harmonia com a natureza.",
      fullDesc: "A Residência Horizon foi concebida como um refúgio que flutua sobre a topografia acidentada. Utilizando concreto aparente e madeira carbonizada, a estrutura cria um diálogo silencioso com a mata nativa circundante. Grandes vãos livres permitem que a luz natural esculpe os interiores ao longo do dia, transformando a casa em um relógio solar habitável.",
      details: ["Concreto Armado", "Vidro Low-E", "Madeira Cumaru"]
    },
    {
      id: 2,
      title: "Galeria Mármore",
      location: "Curitiba, PR",
      category: "Comercial",
      year: "2022",
      area: "1.200m²",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      desc: "Espaços amplos projetados para a arte contemporânea.",
      fullDesc: "Localizada no coração cívico de Curitiba, a Galeria Mármore é um exercício de pureza geométrica. O desafio foi criar um espaço neutro o suficiente para não competir com as obras de arte, mas com personalidade arquitetônica marcante. O uso extensivo de mármore Travertino e iluminação zenital difusa cria uma atmosfera etérea, quase sagrada, dedicada à contemplação da arte.",
      details: ["Mármore Travertino", "Iluminação Zenital", "Aço Corten"]
    },
    {
      id: 3,
      title: "Loft Industrial",
      location: "São Paulo, SP",
      category: "Interiores",
      year: "2024",
      area: "180m²",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      desc: "Releitura moderna de um clássico urbano.",
      fullDesc: "Este projeto de reforma em um antigo galpão industrial no bairro da Barra Funda busca preservar a memória da estrutura original enquanto insere o conforto contemporâneo. As vigas de aço originais foram restauradas e deixadas aparentes, contrastando com divisórias de vidro ultra-clear e mobiliário de design italiano. É um manifesto sobre a reocupação urbana com sofisticação.",
      details: ["Tijolo Aparente", "Estrutura Metálica", "Piso Epóxi"]
    }
  ];

  return (
    <div className="font-sans text-stone-900 bg-stone-50 selection:bg-stone-900 selection:text-white overflow-x-hidden">
      {/* Styles & Fonts - Tailwind V4 permite isso, mas mantemos o Google Fonts aqui para garantir carregamento rápido sem config extra de CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
        
        .font-serif { fontFamily: 'Cormorant Garamond', serif; }
        .font-sans { fontFamily: 'Montserrat', sans-serif; }
        
        .fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-enter { animation: modalEnter 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .modal-exit { animation: modalExit 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes modalEnter {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes modalExit {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(20px); }
        }
      `}</style>

      {/* Project Details Modal (Full Screen Overlay) */}
      {selectedProject && (
        <div className={`fixed inset-0 z-60 bg-white overflow-y-auto ${isClosing ? 'modal-exit' : 'modal-enter'}`}>
          {/* Close / Back Button */}
          <div className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-white/80 backdrop-blur-sm">
            <button 
              onClick={handleCloseProject}
              className="group flex items-center gap-3 text-stone-900 hover:text-amber-700 transition-colors uppercase text-xs tracking-[0.2em]"
            >
              <div className="w-10 h-10 border border-stone-200 rounded-full flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all">
                <ArrowLeft size={16} />
              </div>
              <span>Voltar ao Portfólio</span>
            </button>
            <div className="hidden md:block text-stone-400 text-xs tracking-widest uppercase">
              {selectedProject.category} / {selectedProject.year}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row min-h-screen">
            {/* Image Side */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-900/10"></div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 p-8 md:p-24 pt-32 lg:pt-24 bg-white flex flex-col justify-center">
              <span className="text-amber-700 tracking-[0.2em] text-xs font-bold uppercase mb-6 block fade-in-up" style={{animationDelay: '0.2s'}}>
                {selectedProject.location}
              </span>
              
              <h1 className="text-5xl md:text-6xl font-serif text-stone-900 mb-8 fade-in-up leading-tight" style={{animationDelay: '0.3s'}}>
                {selectedProject.title}
              </h1>

              <div className="w-20 h-1 bg-stone-900 mb-10 fade-in-up" style={{animationDelay: '0.4s'}}></div>

              <div className="grid grid-cols-2 gap-8 mb-12 border-b border-stone-100 pb-8 fade-in-up" style={{animationDelay: '0.5s'}}>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-stone-400 mb-1">Área Construída</span>
                  <span className="text-xl font-serif text-stone-900">{selectedProject.area}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest text-stone-400 mb-1">Ano</span>
                  <span className="text-xl font-serif text-stone-900">{selectedProject.year}</span>
                </div>
              </div>

              <p className="text-stone-600 leading-8 font-light text-lg mb-12 text-justify fade-in-up" style={{animationDelay: '0.6s'}}>
                {selectedProject.fullDesc}
              </p>

              <div className="space-y-4 fade-in-up" style={{animationDelay: '0.7s'}}>
                <span className="block text-xs uppercase tracking-widest text-stone-900 font-bold mb-4">Materiais Principais</span>
                <div className="flex flex-wrap gap-4">
                  {selectedProject.details.map((detail, index) => (
                    <span key={index} className="px-4 py-2 border border-stone-200 text-xs uppercase tracking-wider text-stone-500 rounded-sm">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className={`text-2xl tracking-[0.2em] font-serif font-semibold transition-colors ${isScrolled ? 'text-stone-900' : 'text-white'}`}>
            ARQ<span className="font-light">.VISION</span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex space-x-12 text-xs tracking-widest font-medium uppercase ${isScrolled ? 'text-stone-800' : 'text-white/90'}`}>
            <a href="#home" className="hover:text-amber-600 transition-colors">Início</a>
            <a href="#about" className="hover:text-amber-600 transition-colors">Conceito</a>
            <a href="#projects" className="hover:text-amber-600 transition-colors">Projetos</a>
            <a href="#contact" className="hover:text-amber-600 transition-colors">Contato</a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-stone-800">
            {mobileMenuOpen ? <X className={isScrolled ? 'text-stone-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-stone-900' : 'text-white'} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-stone-900 z-40 flex flex-col items-center justify-center space-y-8 text-white">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif italic">Início</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif italic">Conceito</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif italic">Projetos</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif italic">Contato</a>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Arquitetura Minimalista" 
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto fade-in-up">
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase mb-6 text-white/80 border-b border-white/20 pb-4 inline-block">
            Arquitetura & Design de Interiores
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight mb-8">
            Espaços que <br/> <span className="italic text-amber-100">Transcendem</span>
          </h1>
          <p className="text-sm md:text-lg font-light text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Criamos ambientes onde a funcionalidade encontra a poesia visual. Cada linha desenhada é um propósito.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <button className="px-8 py-3 border border-white hover:bg-white hover:text-stone-900 transition-all duration-300 tracking-widest text-xs uppercase">
              Ver Projetos
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="about" className="py-24 bg-white relative">
        {/* Architectural decorative line */}
        <div className="absolute top-0 left-10 h-full w-px bg-stone-200 hidden md:block"></div>
        <div className="absolute top-0 right-10 h-full w-px bg-stone-200 hidden md:block"></div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-stone-900 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1761971975684-9b900192df96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Detalhe Arquitetônico" 
                className="w-full h-150 object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-stone-900 z-10"></div>
            </div>
            
            <div className="w-full md:w-1/2 pl-0 md:pl-12">
              <span className="text-amber-700 tracking-[0.2em] text-xs font-bold uppercase mb-4 block">A Filosofia</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 text-stone-900">
                A essência do <br/> <span className="italic text-stone-500">viver contemporâneo</span>
              </h2>
              <p className="text-stone-600 leading-8 font-light mb-6 text-justify">
                Não desenhamos apenas casas; esculpimos experiências. Nossa abordagem combina rigor técnico com sensibilidade artística. Acreditamos que a arquitetura deve ser silenciosa o suficiente para acalmar a mente, mas ousada o suficiente para inspirar a alma.
              </p>
              <p className="text-stone-600 leading-8 font-light mb-8 text-justify">
                Cada projeto é único, nascido da topografia do terreno, da luz natural e dos sonhos de quem habitará o espaço.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-stone-200 pt-8">
                <div>
                  <h4 className="text-3xl font-serif text-stone-900 mb-1">150+</h4>
                  <p className="text-xs uppercase tracking-widest text-stone-500">Projetos Entregues</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-stone-900 mb-1">12</h4>
                  <p className="text-xs uppercase tracking-widest text-stone-500">Prêmios Nacionais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Clickable Cards */}
      <section id="projects" className="py-24 bg-stone-100">
        <div className="container mx-auto px-6 mb-16 flex justify-between items-end">
          <div>
            <span className="text-stone-500 tracking-[0.2em] text-xs font-bold uppercase mb-2 block">Portfólio Selecionado</span>
            <h2 className="text-4xl font-serif text-stone-900">Obras Recentes</h2>
          </div>
          <button className="hidden md:flex items-center space-x-2 text-stone-900 hover:text-amber-700 transition-colors text-sm uppercase tracking-widest">
            <span>Ver Todos</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer relative overflow-hidden"
              >
                <div className="h-125 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  <div className="absolute bottom-8 left-8 z-20 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs uppercase tracking-widest mb-2 border-l-2 border-amber-500 pl-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.category}
                    </p>
                    <h3 className="text-3xl font-serif italic mb-1">{project.title}</h3>
                    <p className="text-sm font-light text-white/80 mb-4">{project.location}</p>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <span>Ver Detalhes</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Details Section */}
      <section className="py-24 bg-stone-900 text-white relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-800/30 skew-x-12"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-12">
                Do traço inicial <br/> <span className="text-stone-500 italic">à chave na mão.</span>
              </h2>
              <div className="space-y-12">
                <div className="group">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 cursor-pointer">
                    <h3 className="text-xl font-light tracking-wide group-hover:pl-4 transition-all duration-300">Projetos Residenciais</h3>
                    <MoveRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-stone-400 font-light text-sm max-w-md">Casas de alto padrão, desenhadas para o conforto e sofisticação.</p>
                </div>
                
                <div className="group">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 cursor-pointer">
                    <h3 className="text-xl font-light tracking-wide group-hover:pl-4 transition-all duration-300">Interiores Corporativos</h3>
                    <MoveRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-stone-400 font-light text-sm max-w-md">Ambientes de trabalho que estimulam a produtividade e o bem-estar.</p>
                </div>

                <div className="group">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 cursor-pointer">
                    <h3 className="text-xl font-light tracking-wide group-hover:pl-4 transition-all duration-300">Consultoria de Estilo</h3>
                    <MoveRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-stone-400 font-light text-sm max-w-md">Curadoria de mobiliário e obras de arte para compor o espaço.</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center relative">
                <div className="border border-white/20 p-8 relative">
                   <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white"></div>
                   <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white"></div>
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white"></div>
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white"></div>
                   
                   <p className="font-serif text-2xl md:text-3xl text-center leading-relaxed italic text-stone-300">
                     "A arquitetura é a vontade de uma época traduzida em espaço."
                   </p>
                   <p className="text-center mt-6 text-xs tracking-widest uppercase text-stone-500">— Mies van der Rohe</p>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="w-full md:w-1/3">
              <span className="text-amber-700 tracking-[0.2em] text-xs font-bold uppercase mb-4 block">Contato</span>
              <h2 className="text-4xl font-serif text-stone-900 mb-8">Vamos construir <br/>o futuro.</h2>
              
              <div className="space-y-6 text-stone-600 font-light">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 text-stone-400" size={20} />
                  <p>Av. Paulista, 1200 - Sala 42<br/>São Paulo - SP</p>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 text-stone-400" size={20} />
                  <p>+55 (11) 3300-0000</p>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="mt-1 text-stone-400" size={20} />
                  <p>contato@arqvision.com.br</p>
                </div>
              </div>

              <div className="mt-12 flex gap-6">
                <a href="#" className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-all rounded-full">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-900 hover:text-white transition-all rounded-full">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            <div className="w-full md:w-2/3 bg-stone-50 p-8 md:p-12">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input type="text" id="name" className="peer w-full border-b border-stone-300 bg-transparent py-2 text-stone-900 placeholder-transparent focus:border-stone-900 focus:outline-none transition-colors" placeholder="Nome" />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-stone-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-stone-900">Nome</label>
                  </div>
                  <div className="relative">
                    <input type="email" id="email" className="peer w-full border-b border-stone-300 bg-transparent py-2 text-stone-900 placeholder-transparent focus:border-stone-900 focus:outline-none transition-colors" placeholder="Email" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-stone-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-stone-900">Email</label>
                  </div>
                </div>
                <div className="relative">
                  <textarea id="message" rows="4" className="peer w-full border-b border-stone-300 bg-transparent py-2 text-stone-900 placeholder-transparent focus:border-stone-900 focus:outline-none transition-colors resize-none" placeholder="Mensagem"></textarea>
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-xs text-stone-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-stone-900">Sobre seu projeto</label>
                </div>
                
                <button type="submit" className="bg-stone-900 text-white px-10 py-4 uppercase tracking-[0.2em] text-xs hover:bg-stone-800 transition-colors w-full md:w-auto">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-100 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 font-light tracking-wide">
          <p>&copy; 2026 ARQ.VISION. Todos os direitos reservados.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <a href="#" className="hover:text-stone-900 transition-colors">Política de Privacidade</a>
             <a href="#" className="hover:text-stone-900 transition-colors">Termos de Uso</a>
             <a href="https://ultradigital.online" className="hover:text-purple-900 font-semibold transition-colors">Desenvolvido por Ultra Digital</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;