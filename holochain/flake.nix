{
  description = "Flake for Holochain app development";

  inputs = {
    holonix.url = "./holonix";

    nixpkgs.follows = "holonix/nixpkgs";
    flake-parts.follows = "holonix/flake-parts";
  };

  outputs = inputs@{ flake-parts, ... }: flake-parts.lib.mkFlake { inherit inputs; } {
    systems = builtins.attrNames inputs.holonix.devShells;
    perSystem = { inputs', pkgs, ... }: {
      formatter = pkgs.nixpkgs-fmt;

      devShells.default = pkgs.mkShell {
        inputsFrom = [ inputs'.holonix.devShells.default ];

        packages = (with inputs'.holonix.packages; [
          holochain
          hc
          hcterm
          bootstrap-srv
          lair-keystore
          hc-scaffold
          hn-introspect
          rust
        ]) ++ (with pkgs; [
          nodejs_22
          pnpm
          binaryen
        ]);

        shellHook = ''
          export PS1='\[\033[1;34m\][holonix:\w]\$\[\033[0m\] '
        '';
      };
    };
  };
}