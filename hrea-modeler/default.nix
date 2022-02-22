let
  holonixPath = builtins.fetchTarball "https://github.com/holochain/holonix/archive/9ddfc68aaf665f13e674a5382946f2e262538abe.tar.gz";
  holonix = import (holonixPath) {
    holochainVersionId = "v0_0_125";
  };
  nixpkgs = holonix.pkgs;
in nixpkgs.mkShell {
  inputsFrom = [ holonix.main ];
  packages = with nixpkgs; [
    # Additional packages go here
    nodejs-16_x
  ];
}
