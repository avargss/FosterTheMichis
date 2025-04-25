package com.ftm;


import com.ftm.domain.Michis;
import com.ftm.service.MichisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FosterTheMichisApplication implements CommandLineRunner {

    @Autowired
    private MichisService michisService;

    public static void main(String[] args) {
        SpringApplication.run(FosterTheMichisApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Este método se ejecuta después de que el contexto de la aplicación se haya cargado
        System.out.println("Foster The Michis Application started successfully!");

        // Comentado para que no se añadan cada vez que abro la aplicación o actualizo

        // Crear y guardar un Michi automáticamente
        /*Michis zipi = Michis.builder()
                .name("Zipi")
                .age(11)
                .photo("example")
                .breed("European")
                .description("Just a little boy")
                .adoptable(false)
                .build();

        Michis dany = Michis.builder()
                .name("Dany")
                .age(7)
                .photo("example")
                .breed("Gray")
                .description("Just a little demon")
                .adoptable(false)
                .build();

        Michis fay = Michis.builder()
                .name("Fay")
                .age(9)
                .photo("example")
                .breed("Smol")
                .description("Just a little void")
                .adoptable(false)
                .build();

        michisService.save(zipi);
        michisService.save(dany);
        michisService.save(fay);

        System.out.println("Michi 'Zipi' añadido automáticamente a la base de datos.");
        System.out.println("Michi 'Dany' añadido automáticamente a la base de datos.");
        System.out.println("Michi 'Fay' añadido automáticamente a la base de datos.");*/
    }
}
